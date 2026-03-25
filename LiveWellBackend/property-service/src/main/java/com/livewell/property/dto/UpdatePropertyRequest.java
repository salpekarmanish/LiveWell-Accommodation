package com.livewell.property.dto;

import com.livewell.property.entity.Gender;
import com.livewell.property.entity.PropertyType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePropertyRequest {
    
    @Size(max = 500, message = "Title must not exceed 500 characters")
    private String title;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;
    
    private PropertyType propertyType;
    
    @Min(value = 1, message = "Number of rooms must be at least 1")
    private Integer numberOfRooms;
    
    @Min(value = 1, message = "Number of bathrooms must be at least 1")
    private Integer numberOfBathrooms;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Carpet area must be greater than 0")
    private Double carpetArea;
    
    private String address;
    
    private String city;
    
    private String state;
    
    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits")
    private String pincode;
    
    private Double latitude;
    
    private Double longitude;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Rent must be greater than 0")
    private Double rentPerMonth;
    
    private Double securityDeposit;
    
    @DecimalMin(value = "0.0", message = "Maintenance charges must be 0 or greater")
    private Double maintenanceCharges;
    
    private List<String> amenities;
    
    private List<String> images;
    
    private List<String> videos;
    
    private String video360Url;
    
    private Boolean isFurnished;
    
    private Boolean isPetsAllowed;
    
    private Boolean isAvailable;
    
    private LocalDateTime availableFrom;
    
    @Min(value = 18, message = "Preferred tenant age must be at least 18")
    private Integer preferredTenantAge;
    
    private Gender preferredGender;
}
