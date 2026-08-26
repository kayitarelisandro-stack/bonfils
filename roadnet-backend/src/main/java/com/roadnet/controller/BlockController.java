package com.roadnet.controller;

import com.roadnet.dto.response.BlockResponse;
import com.roadnet.service.BlockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blocks")
@RequiredArgsConstructor
@Tag(name = "Blocks", description = "Block management")
public class BlockController {

    private final BlockService blockService;

    @PostMapping
    @Operation(summary = "Block a user")
    public ResponseEntity<BlockResponse> block(
            Authentication authentication,
            @RequestBody java.util.Map<String, UUID> body) {
        return ResponseEntity.ok(blockService.block(authentication.getName(), body.get("userId")));
    }

    @PostMapping("/{userId}/unblock")
    @Operation(summary = "Unblock a user")
    public ResponseEntity<Void> unblock(
            Authentication authentication,
            @PathVariable UUID userId) {
        blockService.unblock(authentication.getName(), userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @Operation(summary = "Get blocked users")
    public ResponseEntity<List<BlockResponse>> getBlocked(Authentication authentication) {
        return ResponseEntity.ok(blockService.getBlocked(authentication.getName()));
    }
}
