package com.roadnet.service;

import com.roadnet.dto.response.BlockResponse;
import com.roadnet.entity.Block;
import com.roadnet.entity.User;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ConflictException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.BlockRepository;
import com.roadnet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final UserRepository userRepository;

    @Transactional
    public BlockResponse block(String email, UUID userIdToBlock) {
        User blocker = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        User blocked = userRepository.findById(userIdToBlock)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userIdToBlock));

        if (blocker.getId().equals(blocked.getId())) {
            throw new BadRequestException("You cannot block yourself");
        }

        if (blockRepository.existsByBlockerIdAndBlockedId(blocker.getId(), blocked.getId())) {
            throw new ConflictException("You have already blocked this user");
        }

        Block block = Block.builder()
                .blocker(blocker)
                .blocked(blocked)
                .build();
        block = blockRepository.save(block);

        return BlockResponse.builder()
                .id(block.getId())
                .blockedUserId(blocked.getId())
                .blockedUserName(blocked.getDisplayName())
                .createdAt(block.getCreatedAt())
                .build();
    }

    @Transactional
    public void unblock(String email, UUID userIdToUnblock) {
        User blocker = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Block block = blockRepository.findByBlockerId(blocker.getId())
                .stream()
                .filter(b -> b.getBlocked().getId().equals(userIdToUnblock))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Block", "userId", userIdToUnblock));

        blockRepository.delete(block);
    }

    public List<BlockResponse> getBlocked(String email) {
        User blocker = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        return blockRepository.findByBlockerId(blocker.getId())
                .stream()
                .map(b -> BlockResponse.builder()
                        .id(b.getId())
                        .blockedUserId(b.getBlocked().getId())
                        .blockedUserName(b.getBlocked().getDisplayName())
                        .createdAt(b.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public boolean isBlocked(UUID userId1, UUID userId2) {
        return blockRepository.existsByBlockerIdAndBlockedId(userId1, userId2)
                || blockRepository.existsByBlockerIdAndBlockedId(userId2, userId1);
    }
}
