package com.roadnet.service;

import com.roadnet.dto.response.CompatibilityResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompatibilityService {

    private final CompatibilityScoreRepository compatibilityScoreRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ObjectMapper objectMapper;

    private static final double WEIGHT_INTENTIONS = 0.25;
    private static final double WEIGHT_GEOGRAPHY = 0.10;
    private static final double WEIGHT_INTERESTS = 0.15;
    private static final double WEIGHT_LIFESTYLE = 0.15;
    private static final double WEIGHT_LANGUAGES = 0.10;
    private static final double WEIGHT_DISTANCE = 0.05;
    private static final double WEIGHT_OTHER = 0.20;

    @Transactional
    public CompatibilityResponse calculateCompatibility(UUID currentUserId, UUID targetUserId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUserId));
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", targetUserId));

        Profile currentProfile = profileRepository.findByUserId(currentUserId).orElse(null);
        Profile targetProfile = profileRepository.findByUserId(targetUserId).orElse(null);

        if (currentProfile == null || targetProfile == null) {
            return CompatibilityResponse.builder()
                    .score(0.0)
                    .breakdown(CompatibilityResponse.Breakdown.builder()
                            .intentions(0.0).geography(0.0).interests(0.0)
                            .lifestyle(0.0).languages(0.0).distance(0.0).other(0.0)
                            .build())
                    .reasons(List.of("Incomplete profile data"))
                    .build();
        }

        double intentionsScore = calculateIntentionsScore(currentProfile, targetProfile);
        double geographyScore = calculateGeographyScore(currentProfile, targetProfile);
        double interestsScore = calculateInterestsScore(currentProfile, targetProfile);
        double lifestyleScore = calculateLifestyleScore(currentProfile, targetProfile);
        double languagesScore = calculateLanguagesScore(currentProfile, targetProfile);
        double distanceScore = calculateDistanceScore(currentProfile, targetProfile);
        double otherScore = calculateOtherScore(currentProfile, targetProfile);

        double totalScore = (intentionsScore * WEIGHT_INTENTIONS)
                + (geographyScore * WEIGHT_GEOGRAPHY)
                + (interestsScore * WEIGHT_INTERESTS)
                + (lifestyleScore * WEIGHT_LIFESTYLE)
                + (languagesScore * WEIGHT_LANGUAGES)
                + (distanceScore * WEIGHT_DISTANCE)
                + (otherScore * WEIGHT_OTHER);

        List<String> reasons = generateReasons(currentProfile, targetProfile, intentionsScore,
                geographyScore, interestsScore, lifestyleScore, languagesScore, distanceScore, otherScore);

        CompatibilityScore scoreEntity = CompatibilityScore.builder()
                .user1(currentUser)
                .user2(targetUser)
                .totalScore(Math.round(totalScore * 100.0) / 100.0)
                .intentionsScore(Math.round(intentionsScore * 100.0) / 100.0)
                .geographyScore(Math.round(geographyScore * 100.0) / 100.0)
                .interestsScore(Math.round(interestsScore * 100.0) / 100.0)
                .lifestyleScore(Math.round(lifestyleScore * 100.0) / 100.0)
                .languagesScore(Math.round(languagesScore * 100.0) / 100.0)
                .distanceScore(Math.round(distanceScore * 100.0) / 100.0)
                .otherScore(Math.round(otherScore * 100.0) / 100.0)
                .reasons(convertReasonsToJson(reasons))
                .build();

        compatibilityScoreRepository.save(scoreEntity);

        return CompatibilityResponse.builder()
                .score(scoreEntity.getTotalScore())
                .breakdown(CompatibilityResponse.Breakdown.builder()
                        .intentions(scoreEntity.getIntentionsScore())
                        .geography(scoreEntity.getGeographyScore())
                        .interests(scoreEntity.getInterestsScore())
                        .lifestyle(scoreEntity.getLifestyleScore())
                        .languages(scoreEntity.getLanguagesScore())
                        .distance(scoreEntity.getDistanceScore())
                        .other(scoreEntity.getOtherScore())
                        .build())
                .reasons(reasons)
                .build();
    }

    private double calculateIntentionsScore(Profile current, Profile target) {
        if (current.getIntentions() == null || target.getIntentions() == null
                || current.getIntentions().isEmpty() || target.getIntentions().isEmpty()) {
            return 0.5;
        }
        Set<UUID> currentIds = current.getIntentions().stream().map(Intention::getId).collect(Collectors.toSet());
        Set<UUID> targetIds = target.getIntentions().stream().map(Intention::getId).collect(Collectors.toSet());

        Set<UUID> intersection = new HashSet<>(currentIds);
        intersection.retainAll(targetIds);
        Set<UUID> union = new HashSet<>(currentIds);
        union.addAll(targetIds);

        return union.isEmpty() ? 0 : (double) intersection.size() / union.size();
    }

    private double calculateGeographyScore(Profile current, Profile target) {
        if (current.getCountryOfOrigin() == null || target.getCountryOfOrigin() == null) return 0.5;

        double score = 0;
        if (current.getCountryOfOrigin().equalsIgnoreCase(target.getCountryOfOrigin())) {
            score += 0.4;
        }
        if (current.getCurrentCountry() != null && target.getCurrentCountry() != null
                && current.getCurrentCountry().equalsIgnoreCase(target.getCurrentCountry())) {
            score += 0.3;
        }
        if (current.getGeographicPreference() == target.getGeographicPreference()) {
            score += 0.3;
        }
        return Math.min(score, 1.0);
    }

    private double calculateInterestsScore(Profile current, Profile target) {
        if (current.getInterests() == null || target.getInterests() == null
                || current.getInterests().isEmpty() || target.getInterests().isEmpty()) {
            return 0.3;
        }
        Set<UUID> currentIds = current.getInterests().stream().map(Interest::getId).collect(Collectors.toSet());
        Set<UUID> targetIds = target.getInterests().stream().map(Interest::getId).collect(Collectors.toSet());

        Set<UUID> intersection = new HashSet<>(currentIds);
        intersection.retainAll(targetIds);
        Set<UUID> union = new HashSet<>(currentIds);
        union.addAll(targetIds);

        return union.isEmpty() ? 0 : (double) intersection.size() / union.size();
    }

    private double calculateLifestyleScore(Profile current, Profile target) {
        double score = 0;
        int factors = 0;

        if (current.getMaritalStatus() != null && target.getMaritalStatus() != null) {
            if (current.getMaritalStatus() == target.getMaritalStatus()) score += 1.0;
            else if (areCompatibleMaritalStatus(current.getMaritalStatus(), target.getMaritalStatus())) score += 0.6;
            factors++;
        }

        if (current.getAccountPurpose() != null && target.getAccountPurpose() != null) {
            if (current.getAccountPurpose() == target.getAccountPurpose()) score += 1.0;
            else score += 0.2;
            factors++;
        }

        if (current.getProfession() != null && target.getProfession() != null) {
            if (current.getProfession().equalsIgnoreCase(target.getProfession())) score += 0.5;
            factors++;
        }

        return factors == 0 ? 0.5 : score / factors;
    }

    private boolean areCompatibleMaritalStatus(MaritalStatus a, MaritalStatus b) {
        if (a == MaritalStatus.SINGLE && (b == MaritalStatus.SINGLE || b == MaritalStatus.DIVORCED || b == MaritalStatus.WIDOWED)) return true;
        if (b == MaritalStatus.SINGLE && (a == MaritalStatus.SINGLE || a == MaritalStatus.DIVORCED || a == MaritalStatus.WIDOWED)) return true;
        return false;
    }

    private double calculateLanguagesScore(Profile current, Profile target) {
        if (current.getLanguages() == null || target.getLanguages() == null
                || current.getLanguages().isEmpty() || target.getLanguages().isEmpty()) {
            return 0.3;
        }
        Set<UUID> currentIds = current.getLanguages().stream().map(Language::getId).collect(Collectors.toSet());
        Set<UUID> targetIds = target.getLanguages().stream().map(Language::getId).collect(Collectors.toSet());

        Set<UUID> intersection = new HashSet<>(currentIds);
        intersection.retainAll(targetIds);
        Set<UUID> union = new HashSet<>(currentIds);
        union.addAll(targetIds);

        return union.isEmpty() ? 0 : (double) intersection.size() / union.size();
    }

    private double calculateDistanceScore(Profile current, Profile target) {
        if (current.getLatitude() == null || current.getLongitude() == null
                || target.getLatitude() == null || target.getLongitude() == null) {
            return 0.5;
        }

        double distance = haversineDistance(
                current.getLatitude(), current.getLongitude(),
                target.getLatitude(), target.getLongitude()
        );

        if (distance < 50) return 1.0;
        if (distance < 200) return 0.8;
        if (distance < 500) return 0.6;
        if (distance < 1000) return 0.4;
        if (distance < 5000) return 0.3;
        return 0.2;
    }

    private double haversineDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private double calculateOtherScore(Profile current, Profile target) {
        double score = 0;
        int factors = 0;

        if (current.getDateOfBirth() != null && target.getDateOfBirth() != null) {
            int ageDiff = Math.abs(Period.between(current.getDateOfBirth(), LocalDate.now()).getYears()
                    - Period.between(target.getDateOfBirth(), LocalDate.now()).getYears());
            if (ageDiff <= 2) score += 1.0;
            else if (ageDiff <= 5) score += 0.8;
            else if (ageDiff <= 10) score += 0.5;
            else score += 0.2;
            factors++;
        }

        if (current.getGender() != null && target.getGender() != null) {
            score += 0.5;
            factors++;
        }

        if (current.getVisibilityProfile() != null && current.getVisibilityProfile()) score += 0.5;
        if (target.getVisibilityProfile() != null && target.getVisibilityProfile()) score += 0.5;
        factors++;

        return factors == 0 ? 0.5 : Math.min(score / factors, 1.0);
    }

    private List<String> generateReasons(Profile current, Profile target,
                                          double intentions, double geography, double interests,
                                          double lifestyle, double languages, double distance, double other) {
        List<String> reasons = new ArrayList<>();

        if (intentions > 0.7) reasons.add("Strong alignment in relationship intentions");
        else if (intentions > 0.4) reasons.add("Moderate alignment in relationship intentions");

        if (geography > 0.7) reasons.add("Similar geographic preferences and location");
        else if (geography > 0.4) reasons.add("Compatible geographic backgrounds");

        if (interests > 0.7) reasons.add("Many shared interests and hobbies");
        else if (interests > 0.4) reasons.add("Some common interests");

        if (languages > 0.7) reasons.add("Share common languages for communication");
        else if (languages > 0.4) reasons.add("Some overlapping language skills");

        if (distance > 0.7) reasons.add("Geographically close to each other");
        else if (distance < 0.3) reasons.add("Located in different regions");

        if (lifestyle > 0.7) reasons.add("Compatible lifestyle and values");

        if (reasons.isEmpty()) reasons.add("Your profiles have been matched based on overall compatibility");

        return reasons;
    }

    private String convertReasonsToJson(List<String> reasons) {
        try {
            return objectMapper.writeValueAsString(reasons);
        } catch (Exception e) {
            return "[\"" + String.join("\", \"", reasons) + "\"]";
        }
    }
}
