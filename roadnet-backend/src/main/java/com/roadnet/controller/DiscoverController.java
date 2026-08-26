package com.roadnet.controller;

import com.roadnet.dto.response.UserResponse;
import com.roadnet.service.DiscoverService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/discover")
@RequiredArgsConstructor
@Tag(name = "Discover", description = "Discover and search users")
public class DiscoverController {

    private final DiscoverService discoverService;

    @GetMapping
    @Operation(summary = "Get discover feed")
    public ResponseEntity<List<UserResponse>> getDiscoverFeed(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(discoverService.getDiscoverFeed(authentication.getName(), page, size));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id, Authentication authentication) {
        return ResponseEntity.ok(discoverService.getUserById(id, authentication.getName()));
    }
}
