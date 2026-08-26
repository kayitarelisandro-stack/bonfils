package com.roadnet.dto.response;

import com.roadnet.entity.ConnectionStatus;
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
public class ConnectionResponse {

    private UUID id;
    private String connectionCode;
    private UserSummary user1;
    private UserSummary user2;
    private Double compatibilityScore;
    private ConnectionStatus status;
    private LocalDateTime createdAt;

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
