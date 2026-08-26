package com.roadnet.dto.response;

import com.roadnet.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {

    private UUID id;
    private UserSummary reporter;
    private UserSummary reportedUser;
    private ReportCategory category;
    private String description;
    private ReportStatus status;
    private String adminNotes;
    private LocalDateTime resolvedAt;
    private LocalDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserSummary {
        private UUID id;
        private String displayName;
        private String email;
    }
}
