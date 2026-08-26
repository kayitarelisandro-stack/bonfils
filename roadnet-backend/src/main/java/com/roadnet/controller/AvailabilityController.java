package com.roadnet.controller;

import com.roadnet.dto.request.AvailabilityCreateRequest;
import com.roadnet.dto.response.ExperienceResponse;
import com.roadnet.service.AvailabilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
@Tag(name = "Availability", description = "Availability management")
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @PostMapping("/{experienceId}")
    @Operation(summary = "Create availability for an experience")
    public ResponseEntity<ExperienceResponse.AvailabilityResponse> create(
            Authentication authentication,
            @PathVariable UUID experienceId,
            @Valid @RequestBody AvailabilityCreateRequest request) {
        return ResponseEntity.ok(availabilityService.create(authentication.getName(), experienceId, request));
    }
}
