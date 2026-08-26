package com.roadnet.dto.request;

import com.roadnet.entity.ExperienceCategory;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExperienceCreateRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200, message = "Title must be 3-200 characters")
    private String title;

    @Size(max = 5000, message = "Description must be under 5000 characters")
    private String description;

    @NotNull(message = "Category is required")
    private ExperienceCategory category;

    private String imageUrl;

    private String location;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
    private BigDecimal price;

    private String currency;

    private Integer durationMinutes;

    private Integer maxParticipants;
}
