package com.livewell.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long flatId;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String userEmail;
    
    @Column(nullable = false)
    private String userName;
    
    @Column(nullable = false)
    private Long ownerId;
    
    @Column(nullable = false)
    private LocalDate checkInDate;
    
    @Column(nullable = false)
    private LocalDate checkOutDate;
    
    @Column(nullable = false)
    private Integer numberOfMonths;
    
    @Column(nullable = false)
    private Double monthlyRent;
    
    @Column(nullable = false)
    private Double securityDeposit;
    
    @Column(nullable = false)
    private Double maintenanceCharges;
    
    @Column(nullable = false)
    private Double totalAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;
    
    private String paymentId;
    
    private String orderId;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    
    private LocalDateTime paymentDate;
    
    private String cancellationReason;
    
    private LocalDateTime cancellationDate;
    
    private Double refundAmount;
    
    private String refundId;
    
    @Column(length = 1000)
    private String specialRequests;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (numberOfMonths == null || numberOfMonths == 0) {
            numberOfMonths = (int) java.time.temporal.ChronoUnit.MONTHS.between(checkInDate, checkOutDate);
            if (numberOfMonths < 1) numberOfMonths = 1;
        }
        if (totalAmount == null) {
            totalAmount = (monthlyRent * numberOfMonths) + securityDeposit + (maintenanceCharges * numberOfMonths);
        }
    }
}
