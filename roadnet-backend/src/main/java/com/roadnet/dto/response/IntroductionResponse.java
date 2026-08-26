package com.roadnet.dto.response;

import com.roadnet.entity.IntroductionStatus;
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
public class IntroductionResponse {

    private UUID id;
    private UserSummary sender;
    private UserSummary receiver;
    private String message;
    private IntroductionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime respondedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserSummary {
        private UUID id;
        private String displayName;
        private String profileImageUrl;
        private String countryOfOrigin;
    }
}
