package com.roadnet.repository;

import com.roadnet.entity.Experience;
import com.roadnet.entity.ExperienceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, UUID> {

    List<Experience> findByProviderId(UUID providerId);

    List<Experience> findByCategory(ExperienceCategory category);

    List<Experience> findByIsActiveTrue();

    List<Experience> findByIsActiveTrueAndCategory(ExperienceCategory category);
}
