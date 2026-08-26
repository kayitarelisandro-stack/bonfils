package com.roadnet.controller;

import com.roadnet.dto.response.UserResponse;
import com.roadnet.service.SavedProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/saved")
@RequiredArgsConstructor
@Tag(name = "Saved Profiles", description = "Saved profile management")
public class SavedProfileController {

    private final SavedProfileService savedProfileService;

    @PostMapping("/{userId}")
    @Operation(summary = "Save a profile")
    public ResponseEntity<Void> save(
            Authentication authentication,
            @PathVariable UUID userId) {
        savedProfileService.save(authentication.getName(), userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Unsave a profile")
    public ResponseEntity<Void> unsave(
            Authentication authentication,
            @PathVariable UUID userId) {
        savedProfileService.unsave(authentication.getName(), userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "Get saved profiles")
    public ResponseEntity<List<UserResponse>> getSaved(Authentication authentication) {
        return ResponseEntity.ok(savedProfileService.getSaved(authentication.getName()));
    }
}
