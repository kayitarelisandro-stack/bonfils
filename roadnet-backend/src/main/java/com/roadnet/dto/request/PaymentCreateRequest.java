package com.roadnet.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class PaymentCreateRequest {

    @NotNull(message = "Booking ID is required")
    private UUID bookingId;

    private BigDecimal amount;

    private String currency;

    private String method;
}
