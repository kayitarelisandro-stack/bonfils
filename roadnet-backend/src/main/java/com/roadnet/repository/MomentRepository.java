package com.roadnet.repository;

import com.roadnet.entity.Moment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MomentRepository extends JpaRepository<Moment, UUID> {

    List<Moment> findByAuthorIdOrderByCreatedAtDesc(UUID authorId);

    List<Moment> findAllByOrderByCreatedAtDesc();
}
