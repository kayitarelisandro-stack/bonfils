package com.roadnet.service;

import com.roadnet.dto.request.SearchFilters;
import com.roadnet.dto.response.UserResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.mapper.UserMapper;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiscoverService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final BlockRepository blockRepository;
    private final CompatibilityScoreRepository compatibilityScoreRepository;
    private final UserMapper userMapper;

    public List<UserResponse> getDiscoverFeed(String email, int page, int size) {
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<UUID> blockedIds = getBlockedIds(currentUser.getId());

        List<User> users = userRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .getContent();

        return users.stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .filter(u -> !blockedIds.contains(u.getId()))
                .filter(u -> u.getStatus() == AccountStatus.ACTIVE)
                .map(u -> {
                    Profile profile = profileRepository.findByUserId(u.getId()).orElse(null);
                    UserResponse response = userMapper.toUserResponse(u, profile);
                    CompatibilityScore score = compatibilityScoreRepository
                            .findByUser1IdAndUser2Id(currentUser.getId(), u.getId())
                            .or(() -> compatibilityScoreRepository.findByUser1IdAndUser2Id(u.getId(), currentUser.getId()))
                            .orElse(null);
                    if (score != null) {
                        response.setCompatibilityScore(score.getTotalScore());
                    }
                    return response;
                })
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(UUID userId, String requesterEmail) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Profile profile = profileRepository.findByUserId(userId).orElse(null);
        return userMapper.toUserResponse(user, profile);
    }

    public List<UserResponse> searchUsers(SearchFilters filters, String email) {
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<User> allUsers = userRepository.findAll();
        List<UUID> blockedIds = getBlockedIds(currentUser.getId());

        return allUsers.stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .filter(u -> !blockedIds.contains(u.getId()))
                .filter(u -> u.getStatus() == AccountStatus.ACTIVE)
                .filter(u -> {
                    Profile p = profileRepository.findByUserId(u.getId()).orElse(null);
                    if (p == null) return false;

                    if (filters.getKeyword() != null && !filters.getKeyword().isEmpty()) {
                        String keyword = filters.getKeyword().toLowerCase();
                        boolean matchesName = u.getDisplayName().toLowerCase().contains(keyword);
                        boolean matchesBio = p.getBio() != null && p.getBio().toLowerCase().contains(keyword);
                        boolean matchesProfession = p.getProfession() != null && p.getProfession().toLowerCase().contains(keyword);
                        if (!matchesName && !matchesBio && !matchesProfession) return false;
                    }

                    if (filters.getCountry() != null && !filters.getCountry().isEmpty()) {
                        if (p.getCountryOfOrigin() == null || !p.getCountryOfOrigin().equalsIgnoreCase(filters.getCountry())) {
                            if (p.getCurrentCountry() == null || !p.getCurrentCountry().equalsIgnoreCase(filters.getCountry())) {
                                return false;
                            }
                        }
                    }

                    if (filters.getGender() != null && p.getGender() != filters.getGender()) return false;
                    if (filters.getMaritalStatus() != null && p.getMaritalStatus() != filters.getMaritalStatus()) return false;
                    if (filters.getAccountPurpose() != null && p.getAccountPurpose() != filters.getAccountPurpose()) return false;
                    if (filters.getGeographicPreference() != null && p.getGeographicPreference() != filters.getGeographicPreference()) return false;

                    if (filters.getIntentionId() != null && p.getIntentions() != null) {
                        boolean hasIntention = p.getIntentions().stream()
                                .anyMatch(i -> i.getId().equals(filters.getIntentionId()));
                        if (!hasIntention) return false;
                    }

                    if (filters.getInterestId() != null && p.getInterests() != null) {
                        boolean hasInterest = p.getInterests().stream()
                                .anyMatch(i -> i.getId().equals(filters.getInterestId()));
                        if (!hasInterest) return false;
                    }

                    if (filters.getLanguageId() != null && p.getLanguages() != null) {
                        boolean hasLanguage = p.getLanguages().stream()
                                .anyMatch(l -> l.getId().equals(filters.getLanguageId()));
                        if (!hasLanguage) return false;
                    }

                    return true;
                })
                .map(u -> {
                    Profile p = profileRepository.findByUserId(u.getId()).orElse(null);
                    UserResponse response = userMapper.toUserResponse(u, p);
                    CompatibilityScore score = compatibilityScoreRepository
                            .findByUser1IdAndUser2Id(currentUser.getId(), u.getId())
                            .or(() -> compatibilityScoreRepository.findByUser1IdAndUser2Id(u.getId(), currentUser.getId()))
                            .orElse(null);
                    if (score != null) {
                        response.setCompatibilityScore(score.getTotalScore());
                    }
                    return response;
                })
                .collect(Collectors.toList());
    }

    private List<UUID> getBlockedIds(UUID userId) {
        List<UUID> blockedIds = new ArrayList<>();
        blockRepository.findByBlockerId(userId).forEach(b -> blockedIds.add(b.getBlocked().getId()));
        return blockedIds;
    }
}
