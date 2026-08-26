package com.roadnet.dto.response;

import com.roadnet.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private UUID id;
    private String displayName;
    private String email;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String countryOfOrigin;
    private String currentCountry;
    private String region;
    private String bio;
    private String profileImageUrl;
    private Set<String> languages;
    private Set<String> interests;
    private Set<String> intentions;
    private MaritalStatus maritalStatus;
    private String profession;
    private GeographicPreference geographicPreference;
    private AccountPurpose accountPurpose;
    private AccountType accountType;
    private UserRole role;
    private VerificationStatus verificationStatus;
    private Double compatibilityScore;
}
