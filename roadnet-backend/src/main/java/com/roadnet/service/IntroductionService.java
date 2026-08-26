package com.roadnet.service;

import com.roadnet.dto.request.IntroductionSendRequest;
import com.roadnet.dto.response.IntroductionResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ConflictException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntroductionService {

    private final IntroductionRequestRepository introductionRequestRepository;
    private final UserRepository userRepository;
    private final BlockRepository blockRepository;
    private final NotificationService notificationService;

    @Transactional
    public IntroductionResponse sendIntroduction(String senderEmail, IntroductionSendRequest request) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", senderEmail));
        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getReceiverId()));

        if (sender.getId().equals(receiver.getId())) {
            throw new BadRequestException("Cannot send introduction to yourself");
        }

        if (blockRepository.existsByBlockerIdAndBlockedId(receiver.getId(), sender.getId())) {
            throw new BadRequestException("Cannot send introduction to this user");
        }

        boolean alreadySent = introductionRequestRepository
                .findBySenderIdAndStatus(sender.getId(), IntroductionStatus.PENDING)
                .stream()
                .anyMatch(ir -> ir.getReceiver().getId().equals(receiver.getId()));
        if (alreadySent) {
            throw new ConflictException("You already have a pending introduction to this user");
        }

        IntroductionRequest intro = IntroductionRequest.builder()
                .sender(sender)
                .receiver(receiver)
                .message(request.getMessage())
                .status(IntroductionStatus.PENDING)
                .build();
        intro = introductionRequestRepository.save(intro);

        notificationService.create(receiver.getId(), NotificationType.INTRODUCTION_RECEIVED,
                "New Introduction", "You received a new introduction request",
                intro.getId().toString(), "INTRODUCTION");

        return toIntroductionResponse(intro);
    }

    public List<IntroductionResponse> getReceived(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return introductionRequestRepository.findByReceiverIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toIntroductionResponse)
                .collect(Collectors.toList());
    }

    public List<IntroductionResponse> getSent(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return introductionRequestRepository.findBySenderIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toIntroductionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public IntroductionResponse accept(String email, UUID introductionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        IntroductionRequest intro = introductionRequestRepository.findById(introductionId)
                .orElseThrow(() -> new ResourceNotFoundException("Introduction", "id", introductionId));

        if (!intro.getReceiver().getId().equals(user.getId())) {
            throw new BadRequestException("You can only accept introductions sent to you");
        }
        if (intro.getStatus() != IntroductionStatus.PENDING) {
            throw new BadRequestException("This introduction has already been responded to");
        }

        intro.setStatus(IntroductionStatus.ACCEPTED);
        intro.setRespondedAt(LocalDateTime.now());
        intro = introductionRequestRepository.save(intro);

        notificationService.create(intro.getSender().getId(), NotificationType.INTRODUCTION_ACCEPTED,
                "Introduction Accepted", "Your introduction has been accepted",
                intro.getId().toString(), "INTRODUCTION");

        return toIntroductionResponse(intro);
    }

    @Transactional
    public IntroductionResponse decline(String email, UUID introductionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        IntroductionRequest intro = introductionRequestRepository.findById(introductionId)
                .orElseThrow(() -> new ResourceNotFoundException("Introduction", "id", introductionId));

        if (!intro.getReceiver().getId().equals(user.getId())) {
            throw new BadRequestException("You can only decline introductions sent to you");
        }
        if (intro.getStatus() != IntroductionStatus.PENDING) {
            throw new BadRequestException("This introduction has already been responded to");
        }

        intro.setStatus(IntroductionStatus.DECLINED);
        intro.setRespondedAt(LocalDateTime.now());
        intro = introductionRequestRepository.save(intro);

        notificationService.create(intro.getSender().getId(), NotificationType.INTRODUCTION_DECLINED,
                "Introduction Declined", "Your introduction has been declined",
                intro.getId().toString(), "INTRODUCTION");

        return toIntroductionResponse(intro);
    }

    private IntroductionResponse toIntroductionResponse(IntroductionRequest intro) {
        return IntroductionResponse.builder()
                .id(intro.getId())
                .sender(IntroductionResponse.UserSummary.builder()
                        .id(intro.getSender().getId())
                        .displayName(intro.getSender().getDisplayName())
                        .profileImageUrl(intro.getSender().getProfile() != null ? intro.getSender().getProfile().getProfileImageUrl() : null)
                        .countryOfOrigin(intro.getSender().getProfile() != null ? intro.getSender().getProfile().getCountryOfOrigin() : null)
                        .build())
                .receiver(IntroductionResponse.UserSummary.builder()
                        .id(intro.getReceiver().getId())
                        .displayName(intro.getReceiver().getDisplayName())
                        .profileImageUrl(intro.getReceiver().getProfile() != null ? intro.getReceiver().getProfile().getProfileImageUrl() : null)
                        .countryOfOrigin(intro.getReceiver().getProfile() != null ? intro.getReceiver().getProfile().getCountryOfOrigin() : null)
                        .build())
                .message(intro.getMessage())
                .status(intro.getStatus())
                .createdAt(intro.getCreatedAt())
                .respondedAt(intro.getRespondedAt())
                .build();
    }
}
