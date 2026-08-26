package com.roadnet.dto.response;

import com.roadnet.entity.MomentCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MomentResponse {

    private UUID id;
    private UserSummary author;
    private String caption;
    private String imageUrl;
    private MomentCategory category;
    private Integer likesCount;
    private Integer commentsCount;
    private Boolean isLikedByMe;
    private List<CommentResponse> comments;
    private LocalDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserSummary {
        private UUID id;
        private String displayName;
        private String profileImageUrl;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CommentResponse {
        private UUID id;
        private UserSummary author;
        private String content;
        private LocalDateTime createdAt;
    }
}
