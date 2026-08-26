package com.roadnet.controller;

import com.roadnet.dto.request.AvailabilityCreateRequest;
import com.roadnet.dto.request.ExperienceCreateRequest;
import com.roadnet.dto.response.ExperienceResponse;
import com.roadnet.entity.ExperienceCategory;
import com.roadnet.service.AvailabilityService;
import com.roadnet.service.ExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
@Tag(name = "Experiences", description = "Experience listings and bookings")
public class ExperienceController {

    private final ExperienceService experienceService;
    private final AvailabilityService availabilityService;

    @GetMapping
    @Operation(summary = "Get all active experiences")
    public ResponseEntity<List<ExperienceResponse>> getExperiences(
            @RequestParam(required = false) ExperienceCategory category) {
        return ResponseEntity.ok(experienceService.getExperiences(category));
    }

    @PostMapping
    @Operation(summary = "Create a new experience")
    public ResponseEntity<ExperienceResponse> createExperience(
            Authentication authentication,
            @Valid @RequestBody ExperienceCreateRequest request) {
        return ResponseEntity.ok(experienceService.createExperience(authentication.getName(), request));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get experience by ID")
    public ResponseEntity<ExperienceResponse> getExperienceById(@PathVariable UUID id) {
        return ResponseEntity.ok(experienceService.getExperienceById(id));
    }

    @GetMapping("/{id}/availability")
    @Operation(summary = "Get availability for an experience")
    public ResponseEntity<List<ExperienceResponse.AvailabilityResponse>> getAvailability(
            @PathVariable UUID id,
            @RequestParam(required = false) Integer dayOfWeek) {
        if (dayOfWeek != null) {
            return ResponseEntity.ok(availabilityService.getAvailableSlots(id, dayOfWeek));
        }
        return ResponseEntity.ok(availabilityService.getForExperience(id));
    }

    @PostMapping("/{id}/availability")
    @Operation(summary = "Add availability to an experience")
    public ResponseEntity<ExperienceResponse.AvailabilityResponse> addAvailability(
            Authentication authentication,
            @PathVariable UUID id,
            @Valid @RequestBody AvailabilityCreateRequest request) {
        return ResponseEntity.ok(availabilityService.create(authentication.getName(), id, request));
    }
}
