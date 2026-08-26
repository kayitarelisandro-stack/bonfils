package com.roadnet.controller;

import com.roadnet.dto.request.IntroductionSendRequest;
import com.roadnet.dto.response.IntroductionResponse;
import com.roadnet.service.IntroductionService;
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
@RequestMapping("/api/introductions")
@RequiredArgsConstructor
@Tag(name = "Introductions", description = "Introduction request management")
public class IntroductionController {

    private final IntroductionService introductionService;

    @PostMapping
    @Operation(summary = "Send an introduction request")
    public ResponseEntity<IntroductionResponse> sendIntroduction(
            Authentication authentication,
            @Valid @RequestBody IntroductionSendRequest request) {
        return ResponseEntity.ok(introductionService.sendIntroduction(authentication.getName(), request));
    }

    @GetMapping("/received")
    @Operation(summary = "Get received introductions")
    public ResponseEntity<List<IntroductionResponse>> getReceived(Authentication authentication) {
        return ResponseEntity.ok(introductionService.getReceived(authentication.getName()));
    }

    @GetMapping("/sent")
    @Operation(summary = "Get sent introductions")
    public ResponseEntity<List<IntroductionResponse>> getSent(Authentication authentication) {
        return ResponseEntity.ok(introductionService.getSent(authentication.getName()));
    }

    @PutMapping("/{id}/accept")
    @Operation(summary = "Accept an introduction")
    public ResponseEntity<IntroductionResponse> accept(
            Authentication authentication,
            @PathVariable UUID id) {
        return ResponseEntity.ok(introductionService.accept(authentication.getName(), id));
    }

    @PutMapping("/{id}/decline")
    @Operation(summary = "Decline an introduction")
    public ResponseEntity<IntroductionResponse> decline(
            Authentication authentication,
            @PathVariable UUID id) {
        return ResponseEntity.ok(introductionService.decline(authentication.getName(), id));
    }
}
