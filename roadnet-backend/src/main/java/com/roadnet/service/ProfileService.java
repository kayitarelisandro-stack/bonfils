package com.roadnet.service;

import com.roadnet.dto.request.ProfileUpdateRequest;
import com.roadnet.dto.response.ProfileResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.mapper.UserMapper;
import com.roadnet.repository.*;
import com.roadnet.util.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final LanguageRepository languageRepository;
    private final InterestRepository interestRepository;
    private final IntentionRepository intentionRepository;
    private final UserMapper userMapper;
    private final FileUploadUtil fileUploadUtil;

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile", "userId", user.getId()));
        return userMapper.toProfileResponse(user, profile);
    }

    public ProfileResponse getProfileById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile", "userId", userId));
        return userMapper.toProfileResponse(user, profile);
    }

    @Transactional
    public ProfileResponse updateProfile(String email, ProfileUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile", "userId", user.getId()));

        if (request.getDateOfBirth() != null) profile.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) profile.setGender(request.getGender());
        if (request.getCountryOfOrigin() != null) profile.setCountryOfOrigin(request.getCountryOfOrigin());
        if (request.getCurrentCountry() != null) profile.setCurrentCountry(request.getCurrentCountry());
        if (request.getRegion() != null) profile.setRegion(request.getRegion());
        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getProfileImageUrl() != null) profile.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getMaritalStatus() != null) profile.setMaritalStatus(request.getMaritalStatus());
        if (request.getProfession() != null) profile.setProfession(request.getProfession());
        if (request.getGeographicPreference() != null) profile.setGeographicPreference(request.getGeographicPreference());
        if (request.getAccountPurpose() != null) profile.setAccountPurpose(request.getAccountPurpose());
        if (request.getAccountType() != null) profile.setAccountType(request.getAccountType());
        if (request.getVisibilityProfile() != null) profile.setVisibilityProfile(request.getVisibilityProfile());
        if (request.getVisibilitySearch() != null) profile.setVisibilitySearch(request.getVisibilitySearch());
        if (request.getVisibilityLocation() != null) profile.setVisibilityLocation(request.getVisibilityLocation());
        if (request.getWhoCanSendIntroductions() != null) profile.setWhoCanSendIntroductions(request.getWhoCanSendIntroductions());
        if (request.getInternationalVisibility() != null) profile.setInternationalVisibility(request.getInternationalVisibility());

        if (request.getLanguages() != null) {
            Set<Language> languages = new HashSet<>();
            for (UUID langId : request.getLanguages()) {
                languageRepository.findById(langId).ifPresent(languages::add);
            }
            profile.setLanguages(languages);
        }

        if (request.getInterests() != null) {
            Set<Interest> interests = new HashSet<>();
            for (UUID intId : request.getInterests()) {
                interestRepository.findById(intId).ifPresent(interests::add);
            }
            profile.setInterests(interests);
        }

        if (request.getIntentions() != null) {
            Set<Intention> intentions = new HashSet<>();
            for (UUID intId : request.getIntentions()) {
                intentionRepository.findById(intId).ifPresent(intentions::add);
            }
            profile.setIntentions(intentions);
        }

        profile = profileRepository.save(profile);
        return userMapper.toProfileResponse(user, profile);
    }

    @Transactional
    public ProfileResponse uploadPhoto(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Profile", "userId", user.getId()));

        String imageUrl = fileUploadUtil.uploadFile(file);
        profile.setProfileImageUrl(imageUrl);
        profile = profileRepository.save(profile);

        return userMapper.toProfileResponse(user, profile);
    }
}
