package com.livewell.property.repository;

import com.livewell.property.entity.Flat;
import com.livewell.property.entity.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Flat, Long>, JpaSpecificationExecutor<Flat> {
    
    List<Flat> findByOwnerId(Long ownerId);
    
    List<Flat> findByCity(String city);
    
    List<Flat> findByCityAndIsAvailableTrue(String city);
    
    List<Flat> findByPropertyType(PropertyType propertyType);
    
    List<Flat> findByIsVerifiedTrue();
    
    List<Flat> findByIsAvailableTrue();
    
    @Query("SELECT f FROM Flat f WHERE f.city = :city AND f.rentPerMonth BETWEEN :minRent AND :maxRent AND f.isAvailable = true")
    List<Flat> findByCityAndRentRange(@Param("city") String city, 
                                       @Param("minRent") Double minRent, 
                                       @Param("maxRent") Double maxRent);
    
    @Query("SELECT f FROM Flat f WHERE f.isAvailable = true ORDER BY f.averageRating DESC, f.totalReviews DESC")
    List<Flat> findTopRatedProperties();
    
    @Query("SELECT f FROM Flat f WHERE f.isAvailable = true ORDER BY f.createdAt DESC")
    List<Flat> findRecentlyAddedProperties();
    
    @Query("SELECT DISTINCT f.city FROM Flat f WHERE f.isAvailable = true ORDER BY f.city")
    List<String> findAllAvailableCities();
    
    @Query("SELECT COUNT(f) FROM Flat f WHERE f.city = :city AND f.isAvailable = true")
    Long countAvailablePropertiesByCity(@Param("city") String city);
}
