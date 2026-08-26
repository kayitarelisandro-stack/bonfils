package com.roadnet.service;

import com.roadnet.dto.response.AdminDashboardResponse;
import com.roadnet.dto.response.ReportResponse;
import com.roadnet.dto.response.UserListResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ConnectionRepository connectionRepository;
    private final MomentRepository momentRepository;
    private final ExperienceRepository experienceRepository;
    private final BookingRepository bookingRepository;
    private final ReportRepository reportRepository;
    private final NotificationService notificationService;

    public AdminDashboardResponse getDashboard() {
        return AdminDashboardResponse.builder()
                .totalUsers(userRepository.count())
                .activeUsers(userRepository.findAll().stream().filter(u -> u.getStatus() == AccountStatus.ACTIVE).count())
                .suspendedUsers(userRepository.findAll().stream().filter(u -> u.getStatus() == AccountStatus.SUSPENDED).count())
                .totalProviders(userRepository.findAll().stream().filter(u -> u.getRole() == UserRole.PROVIDER).count())
                .totalConnections(connectionRepository.count())
                .totalMoments(momentRepository.count())
                .totalExperiences(experienceRepository.count())
                .totalBookings(bookingRepository.count())
                .pendingReports(reportRepository.countByStatus(ReportStatus.PENDING))
                .verifiedUsers(userRepository.findAll().stream()
                        .filter(u -> u.getVerificationStatus() == VerificationStatus.VERIFIED).count())
                .recentActivities(List.of())
                .build();
    }

    public Page<UserListResponse> getUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(user -> UserListResponse.builder()
                        .id(user.getId())
                        .displayName(user.getDisplayName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .status(user.getStatus())
                        .verificationStatus(user.getVerificationStatus())
                        .countryOfOrigin(user.getProfile() != null ? user.getProfile().getCountryOfOrigin() : null)
                        .currentCountry(user.getProfile() != null ? user.getProfile().getCurrentCountry() : null)
                        .profileImageUrl(user.getProfile() != null ? user.getProfile().getProfileImageUrl() : null)
                        .createdAt(user.getCreatedAt())
                        .connectionCount((long) connectionRepository.findByUser1IdOrUser2Id(user.getId(), user.getId()).size())
                        .build());
    }

    @Transactional
    public void suspendUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setStatus(AccountStatus.SUSPENDED);
        userRepository.save(user);

        notificationService.create(userId, NotificationType.SYSTEM,
                "Account Suspended", "Your account has been suspended by an administrator",
                userId.toString(), "USER");
    }

    @Transactional
    public void activateUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setStatus(AccountStatus.ACTIVE);
        userRepository.save(user);

        notificationService.create(userId, NotificationType.SYSTEM,
                "Account Activated", "Your account has been reactivated",
                userId.toString(), "USER");
    }

    @Transactional
    public void verifyUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setVerificationStatus(VerificationStatus.VERIFIED);
        userRepository.save(user);

        notificationService.create(userId, NotificationType.VERIFICATION_UPDATE,
                "Account Verified", "Your account has been verified",
                userId.toString(), "USER");
    }

    public List<ReportResponse> getReports(ReportStatus status) {
        List<Report> reports;
        if (status != null) {
            reports = reportRepository.findByStatus(status);
        } else {
            reports = reportRepository.findAll();
        }
        return reports.stream()
                .map(this::toReportResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReportResponse resolveReport(UUID reportId, String adminNotes) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report", "id", reportId));
        report.setStatus(ReportStatus.RESOLVED);
        report.setAdminNotes(adminNotes);
        report.setResolvedAt(LocalDateTime.now());
        report = reportRepository.save(report);
        return toReportResponse(report);
    }

    private ReportResponse toReportResponse(Report report) {
        return ReportResponse.builder()
                .id(report.getId())
                .reporter(ReportResponse.UserSummary.builder()
                        .id(report.getReporter().getId())
                        .displayName(report.getReporter().getDisplayName())
                        .email(report.getReporter().getEmail())
                        .build())
                .reportedUser(ReportResponse.UserSummary.builder()
                        .id(report.getReportedUser().getId())
                        .displayName(report.getReportedUser().getDisplayName())
                        .email(report.getReportedUser().getEmail())
                        .build())
                .category(report.getCategory())
                .description(report.getDescription())
                .status(report.getStatus())
                .adminNotes(report.getAdminNotes())
                .resolvedAt(report.getResolvedAt())
                .createdAt(report.getCreatedAt())
                .build();
    }
}
