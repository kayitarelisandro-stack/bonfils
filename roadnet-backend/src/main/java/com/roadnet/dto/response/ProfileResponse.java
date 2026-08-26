package com.roadnet.dto.response;

import com.roadnet.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponse {

    private UUID id;
    private UUID userId;
    private String displayName;
    private String email;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String countryOfOrigin;
    private String currentCountry;
    private String region;
    private String bio;
    private String profileImageUrl;
    private Set<LanguageInfo> languages;
    private Set<InterestInfo> interests;
    private Set<IntentionInfo> intentions;
    private MaritalStatus maritalStatus;
    private String profession;
    private GeographicPreference geographicPreference;
    private AccountPurpose accountPurpose;
    private AccountType accountType;
    private Boolean visibilityProfile;
    private Boolean visibilitySearch;
    private Boolean visibilityLocation;
    private String whoCanSendIntroductions;
    private Boolean internationalVisibility;
    private LocalDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LanguageInfo {
        private UUID id;
        private String name;
        private String code;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InterestInfo {
        private UUID id;
        private String name;
        private String category;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class IntentionInfo {
        private UUID id;
        private String name;
        private String description;
    }
}
