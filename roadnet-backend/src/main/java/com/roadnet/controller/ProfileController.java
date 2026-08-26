package com.roadnet.controller;

import com.roadnet.dto.request.ProfileUpdateRequest;
import com.roadnet.dto.response.ProfileResponse;
import com.roadnet.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Tag(name = "Profile", description = "Profile management")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    @Operation(summary = "Get current user's profile")
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(profileService.getProfile(authentication.getName()));
    }

    @PutMapping
    @Operation(summary = "Update current user's profile")
    public ResponseEntity<ProfileResponse> updateProfile(Authentication authentication,
                                                          @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(profileService.updateProfile(authentication.getName(), request));
    }

    @PostMapping("/photo")
    @Operation(summary = "Upload profile photo")
    public ResponseEntity<ProfileResponse> uploadPhoto(Authentication authentication,
                                                        @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(profileService.uploadPhoto(authentication.getName(), file));
    }
}
