package com.livewell.property.dto;

import com.livewell.property.entity.Gender;
import com.livewell.property.entity.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {
    
    private Long id;
    private Long ownerId;
    private String ownerEmail;
    private String ownerName;
    private String title;
    private String description;
    private PropertyType propertyType;
    private Integer numberOfRooms;
    private Integer numberOfBathrooms;
    private Double carpetArea;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Double latitude;
    private Double longitude;
    private Double rentPerMonth;
    private Double securityDeposit;
    private Double maintenanceCharges;
    private List<String> amenities;
    private List<String> images;
    private List<String> videos;
    private String video360Url;
    private Boolean isFurnished;
    private Boolean isPetsAllowed;
    private Boolean isAvailable;
    private Boolean isVerified;
    private LocalDateTime availableFrom;
    private Integer preferredTenantAge;
    private Gender preferredGender;
    private Integer viewCount;
    private Double averageRating;
    private Integer totalReviews;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
