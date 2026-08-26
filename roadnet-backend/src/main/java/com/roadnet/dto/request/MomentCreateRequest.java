package com.roadnet.dto.request;

import com.roadnet.entity.MomentCategory;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MomentCreateRequest {

    @Size(max = 2000, message = "Caption must be under 2000 characters")
    private String caption;

    private String imageUrl;

    private MomentCategory category;
}
