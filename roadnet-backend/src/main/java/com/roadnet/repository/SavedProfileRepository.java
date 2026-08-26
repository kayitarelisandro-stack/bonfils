package com.roadnet.repository;

import com.roadnet.entity.SavedProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SavedProfileRepository extends JpaRepository<SavedProfile, UUID> {

    Optional<SavedProfile> findByUserIdAndSavedUserId(UUID userId, UUID savedUserId);

    List<SavedProfile> findByUserIdOrderByCreatedAtDesc(UUID userId);

    boolean existsByUserIdAndSavedUserId(UUID userId, UUID savedUserId);
}
