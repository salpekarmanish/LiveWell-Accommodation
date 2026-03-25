package com.livewell.booking.dto;

import com.livewell.booking.entity.BookingStatus;
import com.livewell.booking.entity.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    
    private Long id;
    private Long flatId;
    private Long userId;
    private String userEmail;
    private String userName;
    private Long ownerId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numberOfMonths;
    private Double monthlyRent;
    private Double securityDeposit;
    private Double maintenanceCharges;
    private Double totalAmount;
    private BookingStatus status;
    private String paymentId;
    private String orderId;
    private PaymentStatus paymentStatus;
    private LocalDateTime paymentDate;
    private String cancellationReason;
    private LocalDateTime cancellationDate;
    private Double refundAmount;
    private String refundId;
    private String specialRequests;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
