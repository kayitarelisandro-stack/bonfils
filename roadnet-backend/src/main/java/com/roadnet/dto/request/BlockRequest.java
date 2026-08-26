package com.roadnet.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class BlockRequest {

    @NotNull(message = "User ID to block is required")
    private UUID userId;
}
