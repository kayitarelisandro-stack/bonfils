package com.roadnet.dto.request;

import com.roadnet.entity.ReactionType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReactionCreateRequest {

    @NotNull(message = "Reaction type is required")
    private ReactionType type;
}
