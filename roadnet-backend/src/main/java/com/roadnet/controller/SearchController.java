package com.roadnet.controller;

import com.roadnet.dto.request.SearchFilters;
import com.roadnet.dto.response.UserResponse;
import com.roadnet.service.DiscoverService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Tag(name = "Search", description = "Search users with filters")
class SearchController {

    private final DiscoverService discoverService;

    @GetMapping
    @Operation(summary = "Search users with filters")
    public ResponseEntity<List<UserResponse>> searchUsers(
            Authentication authentication,
            @ModelAttribute SearchFilters filters) {
        return ResponseEntity.ok(discoverService.searchUsers(filters, authentication.getName()));
    }
}
