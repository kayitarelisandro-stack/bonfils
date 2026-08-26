package com.roadnet.service;

import com.roadnet.dto.response.ConnectionResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final CompatibilityScoreRepository compatibilityScoreRepository;
    private final NotificationService notificationService;

    public List<ConnectionResponse> getConnections(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return connectionRepository.findByUser1IdOrUser2Id(user.getId(), user.getId())
                .stream()
                .filter(c -> c.getStatus() == ConnectionStatus.ACCEPTED)
                .map(this::toConnectionResponse)
                .collect(Collectors.toList());
    }

    public ConnectionResponse getConnectionById(String email, UUID connectionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection", "id", connectionId));

        if (!connection.getUser1().getId().equals(user.getId()) && !connection.getUser2().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Connection", "id", connectionId);
        }

        return toConnectionResponse(connection);
    }

    @Transactional
    public ConnectionResponse createConnection(String email, UUID otherUserId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        User otherUser = userRepository.findById(otherUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", otherUserId));

        boolean alreadyConnected = connectionRepository
                .findBetweenUsers(user.getId(), otherUser.getId())
                .isPresent();
        if (alreadyConnected) {
            return connectionRepository
                    .findBetweenUsers(user.getId(), otherUser.getId())
                    .map(this::toConnectionResponse)
                    .orElse(null);
        }

        CompatibilityScore score = compatibilityScoreRepository
                .findByUser1IdAndUser2Id(user.getId(), otherUser.getId())
                .or(() -> compatibilityScoreRepository.findByUser1IdAndUser2Id(otherUser.getId(), user.getId()))
                .orElse(null);

        String connectionCode = generateConnectionCode();

        Connection connection = Connection.builder()
                .connectionCode(connectionCode)
                .user1(user)
                .user2(otherUser)
                .compatibilityScore(score != null ? score.getTotalScore() : null)
                .status(ConnectionStatus.ACCEPTED)
                .build();
        connection = connectionRepository.save(connection);

        notificationService.create(otherUser.getId(), NotificationType.CONNECTION_NEW,
                "New Connection", "You have a new connection!",
                connection.getId().toString(), "CONNECTION");

        return toConnectionResponse(connection);
    }

    private String generateConnectionCode() {
        int year = Year.now().getValue();
        String hex = Integer.toHexString(ThreadLocalRandom.current().nextInt(0x1000, 0xFFFF)).toUpperCase();
        return "RD-" + year + "-" + hex;
    }

    private ConnectionResponse toConnectionResponse(Connection connection) {
        return ConnectionResponse.builder()
                .id(connection.getId())
                .connectionCode(connection.getConnectionCode())
                .user1(ConnectionResponse.UserSummary.builder()
                        .id(connection.getUser1().getId())
                        .displayName(connection.getUser1().getDisplayName())
                        .profileImageUrl(connection.getUser1().getProfile() != null ? connection.getUser1().getProfile().getProfileImageUrl() : null)
                        .countryOfOrigin(connection.getUser1().getProfile() != null ? connection.getUser1().getProfile().getCountryOfOrigin() : null)
                        .build())
                .user2(ConnectionResponse.UserSummary.builder()
                        .id(connection.getUser2().getId())
                        .displayName(connection.getUser2().getDisplayName())
                        .profileImageUrl(connection.getUser2().getProfile() != null ? connection.getUser2().getProfile().getProfileImageUrl() : null)
                        .countryOfOrigin(connection.getUser2().getProfile() != null ? connection.getUser2().getProfile().getCountryOfOrigin() : null)
                        .build())
                .compatibilityScore(connection.getCompatibilityScore())
                .status(connection.getStatus())
                .createdAt(connection.getCreatedAt())
                .build();
    }
}
