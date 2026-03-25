package com.livewell.property.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "flats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long ownerId;
    
    @Column(nullable = false)
    private String ownerEmail;
    
    @Column(nullable = false)
    private String ownerName;
    
    @Column(nullable = false, length = 500)
    private String title;
    
    @Column(length = 2000)
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType propertyType;
    
    @Column(nullable = false)
    private Integer numberOfRooms;
    
    @Column(nullable = false)
    private Integer numberOfBathrooms;
    
    @Column(nullable = false)
    private Double carpetArea;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String state;
    
    @Column(nullable = false, length = 10)
    private String pincode;
    
    private Double latitude;
    
    private Double longitude;
    
    @Column(nullable = false)
    private Double rentPerMonth;
    
    private Double securityDeposit;
    
    @Column(nullable = false)
    private Double maintenanceCharges;
    
    @ElementCollection
    @CollectionTable(name = "flat_amenities", joinColumns = @JoinColumn(name = "flat_id"))
    @Column(name = "amenity")
    private List<String> amenities = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "flat_images", joinColumns = @JoinColumn(name = "flat_id"))
    @Column(name = "image_url", length = 1000)
    private List<String> images = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "flat_videos", joinColumns = @JoinColumn(name = "flat_id"))
    @Column(name = "video_url", length = 1000)
    private List<String> videos = new ArrayList<>();
    
    private String video360Url;
    
    @Column(nullable = false)
    private Boolean isFurnished = false;
    
    @Column(nullable = false)
    private Boolean isPetsAllowed = false;
    
    @Column(nullable = false)
    private Boolean isAvailable = true;
    
    @Column(nullable = false)
    private Boolean isVerified = false;
    
    private LocalDateTime availableFrom;
    
    private Integer preferredTenantAge;
    
    @Enumerated(EnumType.STRING)
    private Gender preferredGender;
    
    @Column(nullable = false)
    private Integer viewCount = 0;
    
    @Column(nullable = false)
    private Double averageRating = 0.0;
    
    @Column(nullable = false)
    private Integer totalReviews = 0;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (securityDeposit == null) {
            securityDeposit = rentPerMonth * 2; // Default 2 months rent
        }
        if (availableFrom == null) {
            availableFrom = LocalDateTime.now();
        }
    }
}
