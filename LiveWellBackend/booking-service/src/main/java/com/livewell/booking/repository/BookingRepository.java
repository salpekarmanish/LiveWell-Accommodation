package com.livewell.booking.repository;

import com.livewell.booking.entity.Booking;
import com.livewell.booking.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUserId(Long userId);
    
    List<Booking> findByOwnerId(Long ownerId);
    
    List<Booking> findByFlatId(Long flatId);
    
    List<Booking> findByStatus(BookingStatus status);
    
    Optional<Booking> findByOrderId(String orderId);
    
    @Query("SELECT b FROM Booking b WHERE b.userId = :userId ORDER BY b.createdAt DESC")
    List<Booking> findUserBookingHistory(@Param("userId") Long userId);
    
    @Query("SELECT b FROM Booking b WHERE b.ownerId = :ownerId ORDER BY b.createdAt DESC")
    List<Booking> findOwnerBookingHistory(@Param("ownerId") Long ownerId);
    
    @Query("SELECT b FROM Booking b WHERE b.flatId = :flatId AND b.status = :status")
    List<Booking> findByFlatIdAndStatus(@Param("flatId") Long flatId, @Param("status") BookingStatus status);
    
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.flatId = :flatId " +
           "AND b.status IN ('CONFIRMED', 'PENDING') " +
           "AND ((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate))")
    boolean existsOverlappingBooking(@Param("flatId") Long flatId,
                                      @Param("checkInDate") LocalDate checkInDate,
                                      @Param("checkOutDate") LocalDate checkOutDate);
    
    @Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED' AND b.checkInDate = :today")
    List<Booking> findBookingsStartingToday(@Param("today") LocalDate today);
    
    @Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED' AND b.checkOutDate = :tomorrow")
    List<Booking> findBookingsEndingTomorrow(@Param("tomorrow") LocalDate tomorrow);
}
