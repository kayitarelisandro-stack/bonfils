package com.roadnet.repository;

import com.roadnet.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, UUID> {

    Optional<Reaction> findByMomentIdAndUserId(UUID momentId, UUID userId);

    boolean existsByMomentIdAndUserId(UUID momentId, UUID userId);

    long countByMomentId(UUID momentId);
}
