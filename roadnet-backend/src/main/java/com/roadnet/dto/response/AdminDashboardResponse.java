package com.roadnet.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Long totalUsers;
    private Long activeUsers;
    private Long suspendedUsers;
    private Long totalProviders;
    private Long totalConnections;
    private Long totalMoments;
    private Long totalExperiences;
    private Long totalBookings;
    private Long pendingReports;
    private Long verifiedUsers;
    private List<RecentActivity> recentActivities;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecentActivity {
        private String type;
        private String description;
        private String timestamp;
    }
}
