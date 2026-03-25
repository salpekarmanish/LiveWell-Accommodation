package com.livewell.property.controller;

import com.livewell.property.dto.CreatePropertyRequest;
import com.livewell.property.dto.PropertyDTO;
import com.livewell.property.dto.PropertySearchCriteria;
import com.livewell.property.dto.UpdatePropertyRequest;
import com.livewell.property.service.PropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {
    
    private final PropertyService propertyService;
    
    @PostMapping
    public ResponseEntity<PropertyDTO> createProperty(
            @Valid @RequestBody CreatePropertyRequest request,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Email") String userEmail,
            @RequestHeader(value = "X-User-Name", required = false) String userName) {
        
        PropertyDTO property = propertyService.createProperty(request, userId, userEmail, userName);
        return ResponseEntity.status(HttpStatus.CREATED).body(property);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        PropertyDTO property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(property);
    }
    
    @PostMapping("/{id}/view")
    public ResponseEntity<PropertyDTO> incrementViewCount(@PathVariable Long id) {
        PropertyDTO property = propertyService.incrementViewCount(id);
        return ResponseEntity.ok(property);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePropertyRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        
        PropertyDTO property = propertyService.updateProperty(id, request, userId);
        return ResponseEntity.ok(property);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProperty(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String userRole) {
        
        propertyService.deleteProperty(id, userId, userRole);
        return ResponseEntity.ok(Map.of("message", "Property deleted successfully"));
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<PropertyDTO>> getPropertiesByOwner(@PathVariable Long ownerId) {
        List<PropertyDTO> properties = propertyService.getPropertiesByOwner(ownerId);
        return ResponseEntity.ok(properties);
    }
    
    @PostMapping("/search")
    public ResponseEntity<List<PropertyDTO>> searchProperties(@RequestBody PropertySearchCriteria criteria) {
        List<PropertyDTO> properties = propertyService.searchProperties(criteria);
        return ResponseEntity.ok(properties);
    }
    
    @GetMapping("/top-rated")
    public ResponseEntity<List<PropertyDTO>> getTopRatedProperties() {
        List<PropertyDTO> properties = propertyService.getTopRatedProperties();
        return ResponseEntity.ok(properties);
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<PropertyDTO>> getRecentlyAddedProperties() {
        List<PropertyDTO> properties = propertyService.getRecentlyAddedProperties();
        return ResponseEntity.ok(properties);
    }
    
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        List<String> cities = propertyService.getAllCities();
        return ResponseEntity.ok(cities);
    }
    
    // Internal API for other microservices
    @PutMapping("/{id}/rating")
    public ResponseEntity<Map<String, String>> updateRating(
            @PathVariable Long id,
            @RequestBody Map<String, Object> ratingData) {
        
        Double averageRating = ((Number) ratingData.get("averageRating")).doubleValue();
        Integer totalReviews = (Integer) ratingData.get("totalReviews");
        
        propertyService.updateRating(id, averageRating, totalReviews);
        return ResponseEntity.ok(Map.of("message", "Rating updated successfully"));
    }
    
    @PutMapping("/{id}/availability")
    public ResponseEntity<Map<String, String>> updateAvailability(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> availabilityData) {
        
        Boolean isAvailable = availabilityData.get("isAvailable");
        propertyService.updateAvailability(id, isAvailable);
        return ResponseEntity.ok(Map.of("message", "Availability updated successfully"));
    }
    
    @PutMapping("/{id}/verify")
    public ResponseEntity<Map<String, String>> verifyProperty(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> verificationData) {
        
        Boolean isVerified = verificationData.get("isVerified");
        propertyService.verifyProperty(id, isVerified);
        return ResponseEntity.ok(Map.of("message", "Property verification status updated successfully"));
    }
}
