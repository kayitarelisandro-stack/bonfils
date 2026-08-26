package com.roadnet.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlockResponse {

    private UUID id;
    private UUID blockedUserId;
    private String blockedUserName;
    private java.time.LocalDateTime createdAt;
}
