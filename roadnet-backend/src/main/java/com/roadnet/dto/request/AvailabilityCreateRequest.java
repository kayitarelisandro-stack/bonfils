package com.roadnet.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class AvailabilityCreateRequest {

    @NotNull(message = "Day of week is required")
    private Integer dayOfWeek;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;

    private Integer slotDurationMinutes;

    private Integer maxBookings;

    private Boolean isAvailable;
}
