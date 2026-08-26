package com.roadnet.service;

import com.roadnet.dto.request.ReportCreateRequest;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.ReportRepository;
import com.roadnet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    @Transactional
    public Report createReport(String email, ReportCreateRequest request) {
        User reporter = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        User reportedUser = userRepository.findById(request.getReportedUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getReportedUserId()));

        if (reporter.getId().equals(reportedUser.getId())) {
            throw new BadRequestException("You cannot report yourself");
        }

        Report report = Report.builder()
                .reporter(reporter)
                .reportedUser(reportedUser)
                .category(request.getCategory())
                .description(request.getDescription())
                .status(ReportStatus.PENDING)
                .build();
        return reportRepository.save(report);
    }
}
