package com.roadnet.controller;

import com.roadnet.dto.request.ReportCreateRequest;
import com.roadnet.entity.Report;
import com.roadnet.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Report management")
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    @Operation(summary = "Create a report")
    public ResponseEntity<Report> createReport(
            Authentication authentication,
            @Valid @RequestBody ReportCreateRequest request) {
        return ResponseEntity.ok(reportService.createReport(authentication.getName(), request));
    }
}
