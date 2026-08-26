package com.roadnet.controller;

import com.roadnet.dto.response.ConnectionResponse;
import com.roadnet.service.ConnectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/connections")
@RequiredArgsConstructor
@Tag(name = "Connections", description = "Connection management")
public class ConnectionController {

    private final ConnectionService connectionService;

    @GetMapping
    @Operation(summary = "Get all connections")
    public ResponseEntity<List<ConnectionResponse>> getConnections(Authentication authentication) {
        return ResponseEntity.ok(connectionService.getConnections(authentication.getName()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get connection by ID")
    public ResponseEntity<ConnectionResponse> getConnectionById(
            Authentication authentication,
            @PathVariable UUID id) {
        return ResponseEntity.ok(connectionService.getConnectionById(authentication.getName(), id));
    }

    @PostMapping("/{userId}")
    @Operation(summary = "Create a new connection")
    public ResponseEntity<ConnectionResponse> createConnection(
            Authentication authentication,
            @PathVariable UUID userId) {
        return ResponseEntity.ok(connectionService.createConnection(authentication.getName(), userId));
    }
}
