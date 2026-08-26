package com.roadnet.controller;

import com.roadnet.dto.response.CompatibilityResponse;
import com.roadnet.entity.User;
import com.roadnet.repository.UserRepository;
import com.roadnet.service.CompatibilityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/compatibility")
@RequiredArgsConstructor
@Tag(name = "Compatibility", description = "Compatibility scoring")
public class CompatibilityController {

    private final CompatibilityService compatibilityService;
    private final UserRepository userRepository;

    @GetMapping("/{userId}")
    @Operation(summary = "Calculate compatibility with another user")
    public ResponseEntity<CompatibilityResponse> getCompatibility(
            Authentication authentication,
            @PathVariable UUID userId) {
        User currentUser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(compatibilityService.calculateCompatibility(currentUser.getId(), userId));
    }
}
