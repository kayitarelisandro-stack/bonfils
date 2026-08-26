package com.roadnet.service;

import com.roadnet.dto.response.UserResponse;
import com.roadnet.entity.SavedProfile;
import com.roadnet.entity.User;
import com.roadnet.exception.ConflictException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.mapper.UserMapper;
import com.roadnet.repository.ProfileRepository;
import com.roadnet.repository.SavedProfileRepository;
import com.roadnet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavedProfileService {

    private final SavedProfileRepository savedProfileRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final UserMapper userMapper;

    @Transactional
    public void save(String email, UUID userIdToSave) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        User savedUser = userRepository.findById(userIdToSave)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userIdToSave));

        if (savedProfileRepository.existsByUserIdAndSavedUserId(user.getId(), userIdToSave)) {
            throw new ConflictException("You have already saved this profile");
        }

        SavedProfile saved = SavedProfile.builder()
                .user(user)
                .savedUser(savedUser)
                .build();
        savedProfileRepository.save(saved);
    }

    @Transactional
    public void unsave(String email, UUID userIdToUnsave) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        SavedProfile saved = savedProfileRepository.findByUserIdAndSavedUserId(user.getId(), userIdToUnsave)
                .orElseThrow(() -> new ResourceNotFoundException("SavedProfile", "userId", userIdToUnsave));

        savedProfileRepository.delete(saved);
    }

    public List<UserResponse> getSaved(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        return savedProfileRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(sp -> {
                    User savedUser = sp.getSavedUser();
                    var profile = profileRepository.findByUserId(savedUser.getId()).orElse(null);
                    return userMapper.toUserResponse(savedUser, profile);
                })
                .collect(Collectors.toList());
    }
}
