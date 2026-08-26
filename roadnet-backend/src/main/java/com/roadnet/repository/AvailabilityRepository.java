package com.roadnet.repository;

import com.roadnet.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, UUID> {

    List<Availability> findByExperienceIdAndDayOfWeekAndIsAvailableTrue(UUID experienceId, Integer dayOfWeek);

    List<Availability> findByExperienceId(UUID experienceId);
}
