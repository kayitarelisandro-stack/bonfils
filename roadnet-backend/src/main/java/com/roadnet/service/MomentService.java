package com.roadnet.service;

import com.roadnet.dto.request.CommentCreateRequest;
import com.roadnet.dto.request.MomentCreateRequest;
import com.roadnet.dto.request.ReactionCreateRequest;
import com.roadnet.dto.response.MomentResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MomentService {

    private final MomentRepository momentRepository;
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public MomentResponse createMoment(String email, MomentCreateRequest request) {
        User author = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        Moment moment = Moment.builder()
                .author(author)
                .caption(request.getCaption())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .likesCount(0)
                .commentsCount(0)
                .build();
        moment = momentRepository.save(moment);

        return toMomentResponse(moment, author.getId());
    }

    public List<MomentResponse> getFeed(String email, int page, int size) {
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        List<Moment> moments = momentRepository.findAllByOrderByCreatedAtDesc();
        int start = page * size;
        int end = Math.min(start + size, moments.size());
        if (start >= moments.size()) return List.of();
        return moments.subList(start, end).stream()
                .map(m -> toMomentResponse(m, currentUser.getId()))
                .collect(Collectors.toList());
    }

    public List<MomentResponse> getMyMoments(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return momentRepository.findByAuthorIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(m -> toMomentResponse(m, user.getId()))
                .collect(Collectors.toList());
    }

    @Transactional
    public MomentResponse comment(String email, UUID momentId, CommentCreateRequest request) {
        User author = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Moment moment = momentRepository.findById(momentId)
                .orElseThrow(() -> new ResourceNotFoundException("Moment", "id", momentId));

        Comment comment = Comment.builder()
                .moment(moment)
                .author(author)
                .content(request.getContent())
                .build();
        commentRepository.save(comment);

        moment.setCommentsCount(moment.getCommentsCount() + 1);
        momentRepository.save(moment);

        if (!moment.getAuthor().getId().equals(author.getId())) {
            notificationService.create(moment.getAuthor().getId(), NotificationType.MOMENT_COMMENT,
                    "New Comment", author.getDisplayName() + " commented on your moment",
                    momentId.toString(), "MOMENT");
        }

        return toMomentResponse(moment, author.getId());
    }

    @Transactional
    public MomentResponse react(String email, UUID momentId, ReactionCreateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Moment moment = momentRepository.findById(momentId)
                .orElseThrow(() -> new ResourceNotFoundException("Moment", "id", momentId));

        boolean alreadyReacted = reactionRepository.existsByMomentIdAndUserId(momentId, user.getId());
        if (alreadyReacted) {
            Reaction existing = reactionRepository.findByMomentIdAndUserId(momentId, user.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Reaction", "id", momentId));
            if (existing.getType() == request.getType()) {
                reactionRepository.delete(existing);
                moment.setLikesCount(Math.max(0, moment.getLikesCount() - 1));
                momentRepository.save(moment);
            } else {
                existing.setType(request.getType());
                reactionRepository.save(existing);
            }
        } else {
            Reaction reaction = Reaction.builder()
                    .moment(moment)
                    .user(user)
                    .type(request.getType())
                    .build();
            reactionRepository.save(reaction);
            moment.setLikesCount(moment.getLikesCount() + 1);
            momentRepository.save(moment);

            if (!moment.getAuthor().getId().equals(user.getId())) {
                notificationService.create(moment.getAuthor().getId(), NotificationType.MOMENT_REACTION,
                        "New Reaction", user.getDisplayName() + " reacted to your moment",
                        momentId.toString(), "MOMENT");
            }
        }

        return toMomentResponse(moment, user.getId());
    }

    private MomentResponse toMomentResponse(Moment moment, UUID currentUserId) {
        boolean isLiked = reactionRepository.existsByMomentIdAndUserId(moment.getId(), currentUserId);

        List<MomentResponse.CommentResponse> comments = commentRepository.findByMomentIdOrderByCreatedAtAsc(moment.getId())
                .stream()
                .map(c -> MomentResponse.CommentResponse.builder()
                        .id(c.getId())
                        .author(MomentResponse.UserSummary.builder()
                                .id(c.getAuthor().getId())
                                .displayName(c.getAuthor().getDisplayName())
                                .profileImageUrl(c.getAuthor().getProfile() != null ? c.getAuthor().getProfile().getProfileImageUrl() : null)
                                .build())
                        .content(c.getContent())
                        .createdAt(c.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return MomentResponse.builder()
                .id(moment.getId())
                .author(MomentResponse.UserSummary.builder()
                        .id(moment.getAuthor().getId())
                        .displayName(moment.getAuthor().getDisplayName())
                        .profileImageUrl(moment.getAuthor().getProfile() != null ? moment.getAuthor().getProfile().getProfileImageUrl() : null)
                        .build())
                .caption(moment.getCaption())
                .imageUrl(moment.getImageUrl())
                .category(moment.getCategory())
                .likesCount(moment.getLikesCount())
                .commentsCount(moment.getCommentsCount())
                .isLikedByMe(isLiked)
                .comments(comments)
                .createdAt(moment.getCreatedAt())
                .build();
    }
}
