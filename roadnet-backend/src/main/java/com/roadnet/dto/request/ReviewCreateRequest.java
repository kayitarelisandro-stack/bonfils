package com.roadnet.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.UUID;

@Data
public class ReviewCreateRequest {

    @NotNull(message = "Experience ID is required")
    private UUID experienceId;

    private UUID bookingId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @Size(max = 2000, message = "Comment must be under 2000 characters")
    private String comment;
}
