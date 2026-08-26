package com.roadnet.repository;

import com.roadnet.entity.IntroductionRequest;
import com.roadnet.entity.IntroductionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IntroductionRequestRepository extends JpaRepository<IntroductionRequest, UUID> {

    List<IntroductionRequest> findByReceiverIdAndStatus(UUID receiverId, IntroductionStatus status);

    List<IntroductionRequest> findBySenderIdAndStatus(UUID senderId, IntroductionStatus status);

    List<IntroductionRequest> findByReceiverIdOrderByCreatedAtDesc(UUID receiverId);

    List<IntroductionRequest> findBySenderIdOrderByCreatedAtDesc(UUID senderId);
}
