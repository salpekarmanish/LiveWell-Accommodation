package com.livewell.property.dto;

import com.livewell.property.entity.Gender;
import com.livewell.property.entity.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertySearchCriteria {
    
    private String city;
    private String state;
    private PropertyType propertyType;
    private Double minRent;
    private Double maxRent;
    private Integer minRooms;
    private Integer maxRooms;
    private Double minArea;
    private Double maxArea;
    private Boolean isFurnished;
    private Boolean isPetsAllowed;
    private List<String> amenities;
    private Gender preferredGender;
    private Double minRating;
    private String sortBy; // price, rating, createdAt
    private String sortOrder; // asc, desc
}
