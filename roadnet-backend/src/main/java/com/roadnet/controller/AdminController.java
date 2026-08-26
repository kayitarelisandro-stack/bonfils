package com.roadnet.controller;

import com.roadnet.dto.response.AdminDashboardResponse;
import com.roadnet.dto.response.ReportResponse;
import com.roadnet.dto.response.UserListResponse;
import com.roadnet.entity.ReportStatus;
import com.roadnet.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Admin dashboard and management")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get admin dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public ResponseEntity<Page<UserListResponse>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(adminService.getUsers(page, size));
    }

    @PutMapping("/users/{id}/suspend")
    @Operation(summary = "Suspend a user")
    public ResponseEntity<Void> suspendUser(@PathVariable UUID id) {
        adminService.suspendUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}/activate")
    @Operation(summary = "Activate a user")
    public ResponseEntity<Void> activateUser(@PathVariable UUID id) {
        adminService.activateUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}/verify")
    @Operation(summary = "Verify a user")
    public ResponseEntity<Void> verifyUser(@PathVariable UUID id) {
        adminService.verifyUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/reports")
    @Operation(summary = "Get all reports")
    public ResponseEntity<List<ReportResponse>> getReports(
            @RequestParam(required = false) ReportStatus status) {
        return ResponseEntity.ok(adminService.getReports(status));
    }

    @PutMapping("/reports/{id}/resolve")
    @Operation(summary = "Resolve a report")
    public ResponseEntity<ReportResponse> resolveReport(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(adminService.resolveReport(id, body.get("adminNotes")));
    }
}
