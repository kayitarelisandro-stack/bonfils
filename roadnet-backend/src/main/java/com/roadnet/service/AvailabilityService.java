package com.roadnet.service;

import com.roadnet.dto.request.AvailabilityCreateRequest;
import com.roadnet.dto.response.ExperienceResponse;
import com.roadnet.entity.Availability;
import com.roadnet.entity.Experience;
import com.roadnet.entity.User;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.AvailabilityRepository;
import com.roadnet.repository.ExperienceRepository;
import com.roadnet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final ExperienceRepository experienceRepository;
    private final UserRepository userRepository;

    @Transactional
    public ExperienceResponse.AvailabilityResponse create(String email, UUID experienceId, AvailabilityCreateRequest request) {
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
        availability = availabilityRepository.save(availability);

        return ExperienceResponse.AvailabilityResponse.builder()
                .id(availability.getId())
                .dayOfWeek(availability.getDayOfWeek())
                .startTime(availability.getStartTime().toString())
                .endTime(availability.getEndTime().toString())
                .slotDurationMinutes(availability.getSlotDurationMinutes())
                .maxBookings(availability.getMaxBookings())
                .isAvailable(availability.getIsAvailable())
                .build();
    }

    public List<ExperienceResponse.AvailabilityResponse> getForExperience(UUID experienceId) {
        return availabilityRepository.findByExperienceId(experienceId)
                .stream()
                .map(a -> ExperienceResponse.AvailabilityResponse.builder()
                        .id(a.getId())
                        .dayOfWeek(a.getDayOfWeek())
                        .startTime(a.getStartTime().toString())
                        .endTime(a.getEndTime().toString())
                        .slotDurationMinutes(a.getSlotDurationMinutes())
                        .maxBookings(a.getMaxBookings())
                        .isAvailable(a.getIsAvailable())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ExperienceResponse.AvailabilityResponse> getAvailableSlots(UUID experienceId, Integer dayOfWeek) {
        return availabilityRepository.findByExperienceIdAndDayOfWeekAndIsAvailableTrue(experienceId, dayOfWeek)
                .stream()
                .map(a -> ExperienceResponse.AvailabilityResponse.builder()
                        .id(a.getId())
                        .dayOfWeek(a.getDayOfWeek())
                        .startTime(a.getStartTime().toString())
                        .endTime(a.getEndTime().toString())
                        .slotDurationMinutes(a.getSlotDurationMinutes())
                        .maxBookings(a.getMaxBookings())
                        .isAvailable(a.getIsAvailable())
                        .build())
                .collect(Collectors.toList());
    }
}
