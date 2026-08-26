package com.roadnet.service;

import com.roadnet.dto.request.AuthRequest;
import com.roadnet.dto.request.RegisterRequest;
import com.roadnet.dto.response.AuthResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ConflictException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.mapper.UserMapper;
import com.roadnet.repository.*;
import com.roadnet.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final LanguageRepository languageRepository;
    private final InterestRepository interestRepository;
    private final IntentionRepository intentionRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already registered");
        }

        LocalDate dob = request.getDateOfBirth();
        if (dob == null) {
            throw new BadRequestException("Date of birth is required");
        }
        int age = Period.between(dob, LocalDate.now()).getYears();
        if (age < 18) {
            throw new BadRequestException("You must be at least 18 years old to register");
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .role(UserRole.USER)
                .status(AccountStatus.ACTIVE)
                .verificationStatus(VerificationStatus.UNVERIFIED)
                .build();
        user = userRepository.save(user);

        Profile profile = Profile.builder()
                .user(user)
                .dateOfBirth(dob)
                .gender(request.getGender())
                .countryOfOrigin(request.getCountryOfOrigin())
                .region(request.getRegion())
                .bio(request.getBio())
                .maritalStatus(request.getMaritalStatus())
                .profession(request.getProfession())
                .geographicPreference(request.getGeographicPreference())
                .accountPurpose(request.getAccountPurpose())
                .accountType(request.getAccountType() != null ? request.getAccountType() : AccountType.INDIVIDUAL)
                .build();

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

        profileRepository.save(profile);

        String token = jwtTokenProvider.generateToken(user.getEmail());

        AuthResponse.UserSummary summary = AuthResponse.UserSummary.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .role(user.getRole().name())
                .profileImageUrl(null)
                .build();

        return AuthResponse.builder()
                .token(token)
                .user(summary)
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        String profileImageUrl = null;
        if (user.getProfile() != null) {
            profileImageUrl = user.getProfile().getProfileImageUrl();
        }

        AuthResponse.UserSummary summary = AuthResponse.UserSummary.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .role(user.getRole().name())
                .profileImageUrl(profileImageUrl)
                .build();

        return AuthResponse.builder()
                .token(token)
                .user(summary)
                .build();
    }

    public AuthResponse.UserSummary getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        String profileImageUrl = null;
        if (user.getProfile() != null) {
            profileImageUrl = user.getProfile().getProfileImageUrl();
        }

        return AuthResponse.UserSummary.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .role(user.getRole().name())
                .profileImageUrl(profileImageUrl)
                .build();
    }
}
