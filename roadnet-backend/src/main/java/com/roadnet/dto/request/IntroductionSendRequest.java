package com.roadnet.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class IntroductionSendRequest {

    @NotNull(message = "Receiver ID is required")
    private UUID receiverId;

    private String message;
}
