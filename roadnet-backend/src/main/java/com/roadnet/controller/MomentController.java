package com.roadnet.controller;

import com.roadnet.dto.request.CommentCreateRequest;
import com.roadnet.dto.request.MomentCreateRequest;
import com.roadnet.dto.request.ReactionCreateRequest;
import com.roadnet.dto.response.MomentResponse;
import com.roadnet.service.MomentService;
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
@RequestMapping("/api/moments")
@RequiredArgsConstructor
@Tag(name = "Moments", description = "Moment sharing and interactions")
public class MomentController {

    private final MomentService momentService;

    @GetMapping
    @Operation(summary = "Get moments feed")
    public ResponseEntity<List<MomentResponse>> getFeed(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(momentService.getFeed(authentication.getName(), page, size));
    }

    @PostMapping
    @Operation(summary = "Create a new moment")
    public ResponseEntity<MomentResponse> createMoment(
            Authentication authentication,
            @Valid @RequestBody MomentCreateRequest request) {
        return ResponseEntity.ok(momentService.createMoment(authentication.getName(), request));
    }

    @PostMapping("/{id}/comments")
    @Operation(summary = "Add a comment to a moment")
    public ResponseEntity<MomentResponse> comment(
            Authentication authentication,
            @PathVariable UUID id,
            @Valid @RequestBody CommentCreateRequest request) {
        return ResponseEntity.ok(momentService.comment(authentication.getName(), id, request));
    }

    @PostMapping("/{id}/reactions")
    @Operation(summary = "React to a moment")
    public ResponseEntity<MomentResponse> react(
            Authentication authentication,
            @PathVariable UUID id,
            @Valid @RequestBody ReactionCreateRequest request) {
        return ResponseEntity.ok(momentService.react(authentication.getName(), id, request));
    }
}
