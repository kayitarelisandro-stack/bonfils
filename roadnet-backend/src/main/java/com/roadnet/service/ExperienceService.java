package com.roadnet.service;

import com.roadnet.dto.request.AvailabilityCreateRequest;
import com.roadnet.dto.request.ExperienceCreateRequest;
import com.roadnet.dto.response.ExperienceResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final AvailabilityRepository availabilityRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Transactional
    public ExperienceResponse createExperience(String email, ExperienceCreateRequest request) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Experience experience = Experience.builder()
                .provider(provider)
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .location(request.getLocation())
                .price(request.getPrice())
                .currency(request.getCurrency() != null ? request.getCurrency() : "USD")
                .durationMinutes(request.getDurationMinutes())
                .maxParticipants(request.getMaxParticipants() != null ? request.getMaxParticipants() : 10)
                .isActive(true)
                .build();
        experience = experienceRepository.save(experience);

        return toExperienceResponse(experience);
    }

    public List<ExperienceResponse> getExperiences(ExperienceCategory category) {
        List<Experience> experiences;
        if (category != null) {
            experiences = experienceRepository.findByIsActiveTrueAndCategory(category);
        } else {
            experiences = experienceRepository.findByIsActiveTrue();
        }
        return experiences.stream()
                .map(this::toExperienceResponse)
                .collect(Collectors.toList());
    }

    public ExperienceResponse getExperienceById(UUID experienceId) {
        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", experienceId));
        return toExperienceResponse(experience);
    }

    public List<ExperienceResponse> getMyExperiences(String email) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return experienceRepository.findByProviderId(provider.getId())
                .stream()
                .map(this::toExperienceResponse)
                .collect(Collectors.toList());
    }

    public ExperienceResponse addAvailability(String email, UUID experienceId, AvailabilityCreateRequest request) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Experience experience = experienceRepository.findById(experienceId)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", experienceId));

        if (!experience.getProvider().getId().equals(provider.getId())) {
            throw new BadRequestException("You can only add availability to your own experiences");
        }

        Availability availability = Availability.builder()
                .experience(experience)
                .dayOfWeek(request.getDayOfWeek())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .slotDurationMinutes(request.getSlotDurationMinutes() != null ? request.getSlotDurationMinutes() : 60)
                .maxBookings(request.getMaxBookings() != null ? request.getMaxBookings() : 1)
                .isAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true)
                .build();
        availabilityRepository.save(availability);

        return toExperienceResponse(experience);
    }

    private ExperienceResponse toExperienceResponse(Experience experience) {
        List<Review> reviews = reviewRepository.findByExperienceIdOrderByCreatedAtDesc(experience.getId());
        Double avgRating = reviews.isEmpty() ? null : reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0);

        List<Availability> availabilities = availabilityRepository.findByExperienceId(experience.getId());

        return ExperienceResponse.builder()
                .id(experience.getId())
                .provider(ExperienceResponse.UserSummary.builder()
                        .id(experience.getProvider().getId())
                        .displayName(experience.getProvider().getDisplayName())
                        .profileImageUrl(experience.getProvider().getProfile() != null ? experience.getProvider().getProfile().getProfileImageUrl() : null)
                        .build())
                .title(experience.getTitle())
                .description(experience.getDescription())
                .category(experience.getCategory())
                .imageUrl(experience.getImageUrl())
                .location(experience.getLocation())
                .price(experience.getPrice())
                .currency(experience.getCurrency())
                .durationMinutes(experience.getDurationMinutes())
                .maxParticipants(experience.getMaxParticipants())
                .isActive(experience.getIsActive())
                .averageRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : null)
                .reviewCount(reviews.size())
                .availabilitySlots(availabilities.stream()
                        .map(a -> ExperienceResponse.AvailabilityResponse.builder()
                                .id(a.getId())
                                .dayOfWeek(a.getDayOfWeek())
                                .startTime(a.getStartTime().toString())
                                .endTime(a.getEndTime().toString())
                                .slotDurationMinutes(a.getSlotDurationMinutes())
                                .maxBookings(a.getMaxBookings())
                                .isAvailable(a.getIsAvailable())
                                .build())
                        .collect(Collectors.toList()))
                .createdAt(experience.getCreatedAt())
                .build();
    }
}
