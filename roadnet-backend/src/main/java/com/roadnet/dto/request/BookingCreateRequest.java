package com.roadnet.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class BookingCreateRequest {

    @NotNull(message = "Experience ID is required")
    private UUID experienceId;

    private UUID availabilityId;

    @NotNull(message = "Booking date is required")
    private LocalDate bookingDate;

    private LocalTime timeSlot;

    private Integer participantsCount;

    private String specialRequests;
}
