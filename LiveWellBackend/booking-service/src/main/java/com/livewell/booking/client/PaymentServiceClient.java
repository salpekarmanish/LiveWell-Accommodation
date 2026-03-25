package com.livewell.booking.client;

import com.livewell.booking.dto.PaymentRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "payment-service")
public interface PaymentServiceClient {
    
    @PostMapping("/api/payments/create-order")
    Map<String, Object> createOrder(@RequestBody PaymentRequest request);
    
    @PostMapping("/api/payments/verify")
    Map<String, Object> verifyPayment(@RequestBody Map<String, String> paymentData);
    
    @PostMapping("/api/payments/refund")
    Map<String, Object> createRefund(@RequestBody Map<String, Object> refundData);
}

            @Valid @RequestBody CreateBookingRequest request,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Email") String userEmail,
            @RequestHeader(value = "X-User-Name", required = false) String userName) {
        
        BookingDTO booking = bookingService.createBooking(request, userId, userEmail, userName);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        BookingDTO booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@PathVariable Long userId) {
        List<BookingDTO> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<BookingDTO>> getOwnerBookings(@PathVariable Long ownerId) {
        List<BookingDTO> bookings = bookingService.getOwnerBookings(ownerId);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/property/{flatId}")
    public ResponseEntity<List<BookingDTO>> getPropertyBookings(@PathVariable Long flatId) {
        List<BookingDTO> bookings = bookingService.getPropertyBookings(flatId);
        return ResponseEntity.ok(bookings);
    }
    
    @PostMapping("/confirm-payment")
    public ResponseEntity<BookingDTO> confirmPayment(@RequestBody Map<String, String> paymentData) {
        String orderId = paymentData.get("orderId");
        String paymentId = paymentData.get("paymentId");
        String signature = paymentData.get("signature");
        
        BookingDTO booking = bookingService.confirmPayment(orderId, paymentId, signature);
        return ResponseEntity.ok(booking);
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingDTO> cancelBooking(
            @PathVariable Long id,
            @RequestBody Map<String, String> cancellationData,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String userRole) {
        
        String reason = cancellationData.get("reason");
        BookingDTO booking = bookingService.cancelBooking(id, reason, userId, userRole);
        return ResponseEntity.ok(booking);
    }
    
    @PutMapping("/{id}/complete")
    public ResponseEntity<BookingDTO> completeBooking(@PathVariable Long id) {
        BookingDTO booking = bookingService.completeBooking(id);
        return ResponseEntity.ok(booking);
    }
}
