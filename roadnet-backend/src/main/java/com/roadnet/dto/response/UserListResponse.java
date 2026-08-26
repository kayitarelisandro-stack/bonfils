package com.roadnet.dto.response;

import com.roadnet.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserListResponse {

    private UUID id;
    private String displayName;
    private String email;
    private UserRole role;
    private AccountStatus status;
    private VerificationStatus verificationStatus;
    private String countryOfOrigin;
    private String currentCountry;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private Long connectionCount;
}
