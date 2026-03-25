package com.livewell.property.service;

import com.livewell.property.dto.CreatePropertyRequest;
import com.livewell.property.dto.PropertyDTO;
import com.livewell.property.dto.PropertySearchCriteria;
import com.livewell.property.dto.UpdatePropertyRequest;
import com.livewell.property.entity.Flat;
import com.livewell.property.exception.BadRequestException;
import com.livewell.property.exception.ResourceNotFoundException;
import com.livewell.property.exception.UnauthorizedException;
import com.livewell.property.repository.PropertyRepository;
import com.livewell.property.specification.PropertySpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyService {
    
    private final PropertyRepository propertyRepository;
    
    @Transactional
    public PropertyDTO createProperty(CreatePropertyRequest request, Long userId, String userEmail, String userName) {
        if (userId == null || userEmail == null) {
            throw new UnauthorizedException("User information is required to create property");
        }
        
        Flat flat = new Flat();
        flat.setOwnerId(userId);
        flat.setOwnerEmail(userEmail);
        flat.setOwnerName(userName);
        flat.setTitle(request.getTitle());
        flat.setDescription(request.getDescription());
        flat.setPropertyType(request.getPropertyType());
        flat.setNumberOfRooms(request.getNumberOfRooms());
        flat.setNumberOfBathrooms(request.getNumberOfBathrooms());
        flat.setCarpetArea(request.getCarpetArea());
        flat.setAddress(request.getAddress());
        flat.setCity(request.getCity());
        flat.setState(request.getState());
        flat.setPincode(request.getPincode());
        flat.setLatitude(request.getLatitude());
        flat.setLongitude(request.getLongitude());
        flat.setRentPerMonth(request.getRentPerMonth());
        flat.setSecurityDeposit(request.getSecurityDeposit());
        flat.setMaintenanceCharges(request.getMaintenanceCharges());
        flat.setAmenities(request.getAmenities());
        flat.setImages(request.getImages());
        flat.setVideos(request.getVideos());
        flat.setVideo360Url(request.getVideo360Url());
        flat.setIsFurnished(request.getIsFurnished());
        flat.setIsPetsAllowed(request.getIsPetsAllowed());
        flat.setAvailableFrom(request.getAvailableFrom());
        flat.setPreferredTenantAge(request.getPreferredTenantAge());
        flat.setPreferredGender(request.getPreferredGender());
        flat.setIsAvailable(true);
        flat.setIsVerified(false);
        
        Flat savedFlat = propertyRepository.save(flat);
        return convertToDTO(savedFlat);
    }
    
    public PropertyDTO getPropertyById(Long id) {
        Flat flat = propertyRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        return convertToDTO(flat);
    }
    
    @Transactional
    public PropertyDTO incrementViewCount(Long id) {
        Flat flat = propertyRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        
        flat.setViewCount(flat.getViewCount() + 1);
        Flat updatedFlat = propertyRepository.save(flat);
        return convertToDTO(updatedFlat);
    }
    
    @Transactional
    public PropertyDTO updateProperty(Long id, UpdatePropertyRequest request, Long userId) {
        Flat flat = propertyRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        
        if (!flat.getOwnerId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to update this property");
        }
        
        if (request.getTitle() != null) flat.setTitle(request.getTitle());
        if (request.getDescription() != null) flat.setDescription(request.getDescription());
        if (request.getPropertyType() != null) flat.setPropertyType(request.getPropertyType());
        if (request.getNumberOfRooms() != null) flat.setNumberOfRooms(request.getNumberOfRooms());
        if (request.getNumberOfBathrooms() != null) flat.setNumberOfBathrooms(request.getNumberOfBathrooms());
        if (request.getCarpetArea() != null) flat.setCarpetArea(request.getCarpetArea());
        if (request.getAddress() != null) flat.setAddress(request.getAddress());
        if (request.getCity() != null) flat.setCity(request.getCity());
        if (request.getState() != null) flat.setState(request.getState());
        if (request.getPincode() != null) flat.setPincode(request.getPincode());
        if (request.getLatitude() != null) flat.setLatitude(request.getLatitude());
        if (request.getLongitude() != null) flat.setLongitude(request.getLongitude());
        if (request.getRentPerMonth() != null) flat.setRentPerMonth(request.getRentPerMonth());
        if (request.getSecurityDeposit() != null) flat.setSecurityDeposit(request.getSecurityDeposit());
        if (request.getMaintenanceCharges() != null) flat.setMaintenanceCharges(request.getMaintenanceCharges());
        if (request.getAmenities() != null) flat.setAmenities(request.getAmenities());
        if (request.getImages() != null) flat.setImages(request.getImages());
        if (request.getVideos() != null) flat.setVideos(request.getVideos());
        if (request.getVideo360Url() != null) flat.setVideo360Url(request.getVideo360Url());
        if (request.getIsFurnished() != null) flat.setIsFurnished(request.getIsFurnished());
        if (request.getIsPetsAllowed() != null) flat.setIsPetsAllowed(request.getIsPetsAllowed());
        if (request.getIsAvailable() != null) flat.setIsAvailable(request.getIsAvailable());
        if (request.getAvailableFrom() != null) flat.setAvailableFrom(request.getAvailableFrom());
        if (request.getPreferredTenantAge() != null) flat.setPreferredTenantAge(request.getPreferredTenantAge());
        if (request.getPreferredGender() != null) flat.setPreferredGender(request.getPreferredGender());
        
        Flat updatedFlat = propertyRepository.save(flat);
        return convertToDTO(updatedFlat);
    }
    
    @Transactional
    public void deleteProperty(Long id, Long userId, String userRole) {
        Flat flat = propertyRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        
        if (!flat.getOwnerId().equals(userId) && !"ADMIN".equals(userRole)) {
            throw new UnauthorizedException("You are not authorized to delete this property");
        }
        
        propertyRepository.delete(flat);
    }
    
    public List<PropertyDTO> getPropertiesByOwner(Long ownerId) {
        return propertyRepository.findByOwnerId(ownerId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<PropertyDTO> searchProperties(PropertySearchCriteria criteria) {
        Specification<Flat> spec = PropertySpecification.withCriteria(criteria);
        
        Sort sort = Sort.unsorted();
        if (criteria.getSortBy() != null) {
            Sort.Direction direction = "desc".equalsIgnoreCase(criteria.getSortOrder()) 
                ? Sort.Direction.DESC 
                : Sort.Direction.ASC;
            sort = Sort.by(direction, criteria.getSortBy());
        }
        
        return propertyRepository.findAll(spec, sort).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<PropertyDTO> getTopRatedProperties() {
        return propertyRepository.findTopRatedProperties().stream()
            .limit(10)
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<PropertyDTO> getRecentlyAddedProperties() {
        return propertyRepository.findRecentlyAddedProperties().stream()
            .limit(10)
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<String> getAllCities() {
        return propertyRepository.findAllAvailableCities();
    }
    
    @Transactional
    public void updateRating(Long propertyId, Double averageRating, Integer totalReviews) {
        Flat flat = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));
        
        flat.setAverageRating(averageRating);
        flat.setTotalReviews(totalReviews);
        propertyRepository.save(flat);
    }
    
    @Transactional
    public void updateAvailability(Long propertyId, Boolean isAvailable) {
        Flat flat = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));
        
        flat.setIsAvailable(isAvailable);
        propertyRepository.save(flat);
    }
    
    @Transactional
    public void verifyProperty(Long propertyId, Boolean isVerified) {
        Flat flat = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));
        
        flat.setIsVerified(isVerified);
        propertyRepository.save(flat);
    }
    
    private PropertyDTO convertToDTO(Flat flat) {
        PropertyDTO dto = new PropertyDTO();
        dto.setId(flat.getId());
        dto.setOwnerId(flat.getOwnerId());
        dto.setOwnerEmail(flat.getOwnerEmail());
        dto.setOwnerName(flat.getOwnerName());
        dto.setTitle(flat.getTitle());
        dto.setDescription(flat.getDescription());
        dto.setPropertyType(flat.getPropertyType());
        dto.setNumberOfRooms(flat.getNumberOfRooms());
        dto.setNumberOfBathrooms(flat.getNumberOfBathrooms());
        dto.setCarpetArea(flat.getCarpetArea());
        dto.setAddress(flat.getAddress());
        dto.setCity(flat.getCity());
        dto.setState(flat.getState());
        dto.setPincode(flat.getPincode());
        dto.setLatitude(flat.getLatitude());
        dto.setLongitude(flat.getLongitude());
        dto.setRentPerMonth(flat.getRentPerMonth());
        dto.setSecurityDeposit(flat.getSecurityDeposit());
        dto.setMaintenanceCharges(flat.getMaintenanceCharges());
        dto.setAmenities(flat.getAmenities());
        dto.setImages(flat.getImages());
        dto.setVideos(flat.getVideos());
        dto.setVideo360Url(flat.getVideo360Url());
        dto.setIsFurnished(flat.getIsFurnished());
        dto.setIsPetsAllowed(flat.getIsPetsAllowed());
        dto.setIsAvailable(flat.getIsAvailable());
        dto.setIsVerified(flat.getIsVerified());
        dto.setAvailableFrom(flat.getAvailableFrom());
        dto.setPreferredTenantAge(flat.getPreferredTenantAge());
        dto.setPreferredGender(flat.getPreferredGender());
        dto.setViewCount(flat.getViewCount());
        dto.setAverageRating(flat.getAverageRating());
        dto.setTotalReviews(flat.getTotalReviews());
        dto.setCreatedAt(flat.getCreatedAt());
        dto.setUpdatedAt(flat.getUpdatedAt());
        return dto;
    }
}
