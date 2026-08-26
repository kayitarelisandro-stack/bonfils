package com.roadnet.dto.response;

import com.roadnet.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private UUID id;
    private ExperienceSummary experience;
    private UserSummary user;
    private LocalDate bookingDate;
    private LocalTime timeSlot;
    private BookingStatus status;
    private Integer participantsCount;
    private BigDecimal totalPrice;
    private String currency;
    private String specialRequests;
    private Boolean isPaid;
    private LocalDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ExperienceSummary {
        private UUID id;
        private String title;
        private String location;
        private BigDecimal price;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserSummary {
        private UUID id;
        private String displayName;
        private String profileImageUrl;
    }
}
