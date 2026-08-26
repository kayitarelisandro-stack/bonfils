package com.roadnet.repository;

import com.roadnet.entity.CompatibilityScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompatibilityScoreRepository extends JpaRepository<CompatibilityScore, UUID> {

    Optional<CompatibilityScore> findByUser1IdAndUser2Id(UUID user1Id, UUID user2Id);
}
