package com.roadnet.repository;

import com.roadnet.entity.Booking;
import com.roadnet.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    List<Booking> findByUserIdOrderByCreatedAtDesc(UUID userId);

    List<Booking> findByExperienceId(UUID experienceId);

    List<Booking> findByAvailabilityIdAndBookingDate(UUID availabilityId, LocalDate bookingDate);

    List<Booking> findByExperienceIdAndStatus(UUID experienceId, BookingStatus status);

    List<Booking> findByExperienceProviderIdOrderByCreatedAtDesc(UUID providerId);
}
