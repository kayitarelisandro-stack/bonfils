package com.roadnet.dto.request;

import com.roadnet.entity.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Data
public class ProfileUpdateRequest {

    private LocalDate dateOfBirth;
    private Gender gender;
    private String countryOfOrigin;
    private String currentCountry;
    private String region;
    private String bio;
    private String profileImageUrl;
    private Set<UUID> languages;
    private Set<UUID> interests;
    private Set<UUID> intentions;
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
}
