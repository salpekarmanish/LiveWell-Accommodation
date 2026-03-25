package com.livewell.property.specification;

import com.livewell.property.dto.PropertySearchCriteria;
import com.livewell.property.entity.Flat;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class PropertySpecification {
    
    public static Specification<Flat> withCriteria(PropertySearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Always filter for available properties
            predicates.add(criteriaBuilder.isTrue(root.get("isAvailable")));
            
            // City filter
            if (criteria.getCity() != null && !criteria.getCity().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("city")), 
                    criteria.getCity().toLowerCase()
                ));
            }
            
            // State filter
            if (criteria.getState() != null && !criteria.getState().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("state")), 
                    criteria.getState().toLowerCase()
                ));
            }
            
            // Property type filter
            if (criteria.getPropertyType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("propertyType"), criteria.getPropertyType()));
            }
            
            // Rent range filter
            if (criteria.getMinRent() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("rentPerMonth"), criteria.getMinRent()));
            }
            if (criteria.getMaxRent() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("rentPerMonth"), criteria.getMaxRent()));
            }
            
            // Rooms filter
            if (criteria.getMinRooms() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("numberOfRooms"), criteria.getMinRooms()));
            }
            if (criteria.getMaxRooms() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("numberOfRooms"), criteria.getMaxRooms()));
            }
            
            // Area filter
            if (criteria.getMinArea() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("carpetArea"), criteria.getMinArea()));
            }
            if (criteria.getMaxArea() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("carpetArea"), criteria.getMaxArea()));
            }
            
            // Furnished filter
            if (criteria.getIsFurnished() != null) {
                predicates.add(criteriaBuilder.equal(root.get("isFurnished"), criteria.getIsFurnished()));
            }
            
            // Pets allowed filter
            if (criteria.getIsPetsAllowed() != null) {
                predicates.add(criteriaBuilder.equal(root.get("isPetsAllowed"), criteria.getIsPetsAllowed()));
            }
            
            // Preferred gender filter
            if (criteria.getPreferredGender() != null) {
                predicates.add(criteriaBuilder.equal(root.get("preferredGender"), criteria.getPreferredGender()));
            }
            
            // Rating filter
            if (criteria.getMinRating() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("averageRating"), criteria.getMinRating()));
            }
            
            // Amenities filter
            if (criteria.getAmenities() != null && !criteria.getAmenities().isEmpty()) {
                for (String amenity : criteria.getAmenities()) {
                    predicates.add(criteriaBuilder.isMember(amenity, root.get("amenities")));
                }
            }
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
