package com.livewell.booking.client;

import com.livewell.booking.dto.PropertyDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "property-service")
public interface PropertyServiceClient {
    
    @GetMapping("/api/properties/{id}")
    PropertyDTO getPropertyById(@PathVariable Long id);
    
    @PutMapping("/api/properties/{id}/availability")
    void updateAvailability(@PathVariable Long id, @RequestBody Map<String, Boolean> availabilityData);
}

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final PropertyServiceClient propertyServiceClient;
    private final PaymentServiceClient paymentServiceClient;
    
    @Transactional
    public BookingDTO createBooking(CreateBookingRequest request, Long userId, String userEmail, String userName) {
        if (userId == null || userEmail == null) {
            throw new UnauthorizedException("User information is required to create booking");
        }
        
        // Validate dates
        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {
            throw new BadRequestException("Check-out date must be after check-in date");
        }
        
        // Get property details
        PropertyDTO property = propertyServiceClient.getPropertyById(request.getFlatId());
        
        if (property == null) {
            throw new ResourceNotFoundException("Property not found with id: " + request.getFlatId());
        }
        
        if (!property.getIsAvailable()) {
            throw new BadRequestException("Property is not available for booking");
        }
        
        // Check for overlapping bookings
        boolean hasOverlap = bookingRepository.existsOverlappingBooking(
            request.getFlatId(), 
            request.getCheckInDate(), 
            request.getCheckOutDate()
        );
        
        if (hasOverlap) {
            throw new BadRequestException("Property is already booked for the selected dates");
        }
        
        // Create booking
        Booking booking = new Booking();
        booking.setFlatId(request.getFlatId());
        booking.setUserId(userId);
        booking.setUserEmail(userEmail);
        booking.setUserName(userName);
        booking.setOwnerId(property.getOwnerId());
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setNumberOfMonths(request.getNumberOfMonths());
        booking.setMonthlyRent(property.getRentPerMonth());
        booking.setSecurityDeposit(property.getSecurityDeposit());
        booking.setMaintenanceCharges(property.getMaintenanceCharges());
        booking.setSpecialRequests(request.getSpecialRequests());
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Create payment order
        try {
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setBookingId(savedBooking.getId());
            paymentRequest.setAmount(savedBooking.getTotalAmount());
            paymentRequest.setCurrency("INR");
            paymentRequest.setReceipt("BOOKING_" + savedBooking.getId());
            
            Map<String, Object> orderResponse = paymentServiceClient.createOrder(paymentRequest);
            savedBooking.setOrderId((String) orderResponse.get("orderId"));
            savedBooking = bookingRepository.save(savedBooking);
        } catch (Exception e) {
            log.error("Failed to create payment order for booking: " + savedBooking.getId(), e);
        }
        
        return convertToDTO(savedBooking);
    }
    
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return convertToDTO(booking);
    }
    
    public List<BookingDTO> getUserBookings(Long userId) {
        return bookingRepository.findUserBookingHistory(userId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<BookingDTO> getOwnerBookings(Long ownerId) {
        return bookingRepository.findOwnerBookingHistory(ownerId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<BookingDTO> getPropertyBookings(Long flatId) {
        return bookingRepository.findByFlatId(flatId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public BookingDTO confirmPayment(String orderId, String paymentId, String signature) {
        Booking booking = bookingRepository.findByOrderId(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found for order: " + orderId));
        
        // Verify payment
        try {
            Map<String, String> paymentData = Map.of(
                "orderId", orderId,
                "paymentId", paymentId,
                "signature", signature
            );
            
            Map<String, Object> verificationResponse = paymentServiceClient.verifyPayment(paymentData);
            Boolean isValid = (Boolean) verificationResponse.get("isValid");
            
            if (isValid) {
                booking.setPaymentId(paymentId);
                booking.setPaymentStatus(PaymentStatus.COMPLETED);
                booking.setPaymentDate(LocalDateTime.now());
                booking.setStatus(BookingStatus.CONFIRMED);
                
                // Update property availability
                propertyServiceClient.updateAvailability(
                    booking.getFlatId(), 
                    Map.of("isAvailable", false)
                );
            } else {
                booking.setPaymentStatus(PaymentStatus.FAILED);
                throw new BadRequestException("Payment verification failed");
            }
        } catch (Exception e) {
            booking.setPaymentStatus(PaymentStatus.FAILED);
            bookingRepository.save(booking);
            throw new BadRequestException("Payment verification failed: " + e.getMessage());
        }
        
        Booking updatedBooking = bookingRepository.save(booking);
        return convertToDTO(updatedBooking);
    }
    
    @Transactional
    public BookingDTO cancelBooking(Long id, String reason, Long userId, String userRole) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        if (!booking.getUserId().equals(userId) && !booking.getOwnerId().equals(userId) && !"ADMIN".equals(userRole)) {
            throw new UnauthorizedException("You are not authorized to cancel this booking");
        }
        
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled");
        }
        
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("Cannot cancel a completed booking");
        }
        
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancellationReason(reason);
        booking.setCancellationDate(LocalDateTime.now());
        
        // Process refund if payment was made
        if (booking.getPaymentStatus() == PaymentStatus.COMPLETED) {
            try {
                Double refundAmount = calculateRefundAmount(booking);
                
                Map<String, Object> refundRequest = Map.of(
                    "paymentId", booking.getPaymentId(),
                    "amount", refundAmount
                );
                
                Map<String, Object> refundResponse = paymentServiceClient.createRefund(refundRequest);
                String refundId = (String) refundResponse.get("refundId");
                
                booking.setRefundAmount(refundAmount);
                booking.setRefundId(refundId);
                booking.setPaymentStatus(refundAmount.equals(booking.getTotalAmount()) 
                    ? PaymentStatus.REFUNDED 
                    : PaymentStatus.PARTIALLY_REFUNDED);
                
            } catch (Exception e) {
                log.error("Failed to process refund for booking: " + id, e);
            }
        }
        
        // Make property available again
        propertyServiceClient.updateAvailability(
            booking.getFlatId(), 
            Map.of("isAvailable", true)
        );
        
        Booking updatedBooking = bookingRepository.save(booking);
        return convertToDTO(updatedBooking);
    }
    
    @Transactional
    public BookingDTO completeBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BadRequestException("Only confirmed bookings can be completed");
        }
        
        booking.setStatus(BookingStatus.COMPLETED);
        
        // Make property available again
        propertyServiceClient.updateAvailability(
            booking.getFlatId(), 
            Map.of("isAvailable", true)
        );
        
        Booking updatedBooking = bookingRepository.save(booking);
        return convertToDTO(updatedBooking);
    }
    
    private Double calculateRefundAmount(Booking booking) {
        long daysUntilCheckIn = java.time.temporal.ChronoUnit.DAYS.between(
            LocalDate.now(), 
            booking.getCheckInDate()
        );
        
        Double totalAmount = booking.getTotalAmount();
        
        if (daysUntilCheckIn >= 30) {
            // Full refund if cancelled 30+ days before check-in
            return totalAmount;
        } else if (daysUntilCheckIn >= 15) {
            // 75% refund if cancelled 15-29 days before check-in
            return totalAmount * 0.75;
        } else if (daysUntilCheckIn >= 7) {
            // 50% refund if cancelled 7-14 days before check-in
            return totalAmount * 0.50;
        } else {
            // 25% refund if cancelled less than 7 days before check-in
            return totalAmount * 0.25;
        }
    }
    
    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setFlatId(booking.getFlatId());
        dto.setUserId(booking.getUserId());
        dto.setUserEmail(booking.getUserEmail());
        dto.setUserName(booking.getUserName());
        dto.setOwnerId(booking.getOwnerId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setNumberOfMonths(booking.getNumberOfMonths());
        dto.setMonthlyRent(booking.getMonthlyRent());
        dto.setSecurityDeposit(booking.getSecurityDeposit());
        dto.setMaintenanceCharges(booking.getMaintenanceCharges());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        dto.setPaymentId(booking.getPaymentId());
        dto.setOrderId(booking.getOrderId());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setPaymentDate(booking.getPaymentDate());
        dto.setCancellationReason(booking.getCancellationReason());
        dto.setCancellationDate(booking.getCancellationDate());
        dto.setRefundAmount(booking.getRefundAmount());
        dto.setRefundId(booking.getRefundId());
        dto.setSpecialRequests(booking.getSpecialRequests());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setUpdatedAt(booking.getUpdatedAt());
        return dto;
    }
}
