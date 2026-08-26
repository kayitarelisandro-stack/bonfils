package com.roadnet.repository;

import com.roadnet.entity.Intention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IntentionRepository extends JpaRepository<Intention, UUID> {

    Optional<Intention> findByName(String name);
}
