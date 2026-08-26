package com.roadnet.mapper;

import com.roadnet.dto.response.ProfileResponse;
import com.roadnet.dto.response.UserResponse;
import com.roadnet.entity.Profile;
import com.roadnet.entity.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserResponse toUserResponse(User user, Profile profile) {
        if (user == null) return null;

        UserResponse.UserResponseBuilder builder = UserResponse.builder()
                .id(user.getId())
                .displayName(user.getDisplayName())
                .email(user.getEmail())
                .role(user.getRole())
                .verificationStatus(user.getVerificationStatus());

        if (profile != null) {
            builder.dateOfBirth(profile.getDateOfBirth())
                    .gender(profile.getGender())
                    .countryOfOrigin(profile.getCountryOfOrigin())
                    .currentCountry(profile.getCurrentCountry())
                    .region(profile.getRegion())
                    .bio(profile.getBio())
                    .profileImageUrl(profile.getProfileImageUrl())
                    .maritalStatus(profile.getMaritalStatus())
                    .profession(profile.getProfession())
                    .geographicPreference(profile.getGeographicPreference())
                    .accountPurpose(profile.getAccountPurpose())
                    .accountType(profile.getAccountType());

            if (profile.getLanguages() != null) {
                builder.languages(profile.getLanguages().stream()
                        .map(l -> l.getName())
                        .collect(Collectors.toSet()));
            }
            if (profile.getInterests() != null) {
                builder.interests(profile.getInterests().stream()
                        .map(i -> i.getName())
                        .collect(Collectors.toSet()));
            }
            if (profile.getIntentions() != null) {
                builder.intentions(profile.getIntentions().stream()
                        .map(i -> i.getName())
                        .collect(Collectors.toSet()));
            }
        }

        return builder.build();
    }

    public ProfileResponse toProfileResponse(User user, Profile profile) {
        if (profile == null) return null;

        ProfileResponse.ProfileResponseBuilder builder = ProfileResponse.builder()
                .id(profile.getId())
                .userId(user.getId())
                .displayName(user.getDisplayName())
                .email(user.getEmail())
                .dateOfBirth(profile.getDateOfBirth())
                .gender(profile.getGender())
                .countryOfOrigin(profile.getCountryOfOrigin())
                .currentCountry(profile.getCurrentCountry())
                .region(profile.getRegion())
                .bio(profile.getBio())
                .profileImageUrl(profile.getProfileImageUrl())
                .maritalStatus(profile.getMaritalStatus())
                .profession(profile.getProfession())
                .geographicPreference(profile.getGeographicPreference())
                .accountPurpose(profile.getAccountPurpose())
                .accountType(profile.getAccountType())
                .visibilityProfile(profile.getVisibilityProfile())
                .visibilitySearch(profile.getVisibilitySearch())
                .visibilityLocation(profile.getVisibilityLocation())
                .whoCanSendIntroductions(profile.getWhoCanSendIntroductions())
                .internationalVisibility(profile.getInternationalVisibility())
                .createdAt(profile.getCreatedAt());

        if (profile.getLanguages() != null) {
            builder.languages(profile.getLanguages().stream()
                    .map(l -> ProfileResponse.LanguageInfo.builder()
                            .id(l.getId())
                            .name(l.getName())
                            .code(l.getCode())
                            .build())
                    .collect(Collectors.toSet()));
        }
        if (profile.getInterests() != null) {
            builder.interests(profile.getInterests().stream()
                    .map(i -> ProfileResponse.InterestInfo.builder()
                            .id(i.getId())
                            .name(i.getName())
                            .category(i.getCategory())
                            .build())
                    .collect(Collectors.toSet()));
        }
        if (profile.getIntentions() != null) {
            builder.intentions(profile.getIntentions().stream()
                    .map(i -> ProfileResponse.IntentionInfo.builder()
                            .id(i.getId())
                            .name(i.getName())
                            .description(i.getDescription())
                            .build())
                    .collect(Collectors.toSet()));
        }

        return builder.build();
    }
}
