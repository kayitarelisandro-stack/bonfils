package com.roadnet.dto.request;

import com.roadnet.entity.ReportCategory;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class ReportCreateRequest {

    @NotNull(message = "Reported user ID is required")
    private UUID reportedUserId;

    @NotNull(message = "Category is required")
    private ReportCategory category;

    @NotNull(message = "Description is required")
    @Size(min = 10, max = 5000, message = "Description must be 10-5000 characters")
    private String description;
}
