package com.roadnet.controller;

import com.roadnet.dto.request.ReviewCreateRequest;
import com.roadnet.dto.response.ReviewResponse;
import com.roadnet.service.ReviewService;
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
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Review management")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    @Operation(summary = "Create a review")
    public ResponseEntity<ReviewResponse> createReview(
            Authentication authentication,
            @Valid @RequestBody ReviewCreateRequest request) {
        return ResponseEntity.ok(reviewService.createReview(authentication.getName(), request));
    }

    @GetMapping("/experience/{id}")
    @Operation(summary = "Get reviews for an experience")
    public ResponseEntity<List<ReviewResponse>> getByExperience(@PathVariable UUID id) {
        return ResponseEntity.ok(reviewService.getByExperience(id));
    }
}
