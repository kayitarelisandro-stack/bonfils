package com.roadnet.dto.response;

import com.roadnet.entity.ExperienceCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceResponse {

    private UUID id;
    private UserSummary provider;
    private String title;
    private String description;
    private ExperienceCategory category;
    private String imageUrl;
    private String location;
    private BigDecimal price;
    private String currency;
    private Integer durationMinutes;
    private Integer maxParticipants;
    private Boolean isActive;
    private Double averageRating;
    private Integer reviewCount;
    private List<AvailabilityResponse> availabilitySlots;
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
    public static class AvailabilityResponse {
        private UUID id;
        private Integer dayOfWeek;
        private String startTime;
        private String endTime;
        private Integer slotDurationMinutes;
        private Integer maxBookings;
        private Boolean isAvailable;
    }
}
