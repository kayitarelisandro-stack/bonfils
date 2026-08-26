package com.roadnet.service;

import com.roadnet.dto.request.ReviewCreateRequest;
import com.roadnet.dto.response.ReviewResponse;
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
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ExperienceRepository experienceRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Transactional
    public ReviewResponse createReview(String email, ReviewCreateRequest request) {
        User reviewer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Experience experience = experienceRepository.findById(request.getExperienceId())
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", request.getExperienceId()));

        if (request.getBookingId() != null) {
            Booking booking = bookingRepository.findById(request.getBookingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", request.getBookingId()));
            if (!booking.getUser().getId().equals(reviewer.getId())) {
                throw new BadRequestException("You can only review your own bookings");
            }
            if (booking.getStatus() != BookingStatus.COMPLETED) {
                throw new BadRequestException("You can only review completed bookings");
            }
        }

        boolean alreadyReviewed = reviewRepository.findByExperienceIdOrderByCreatedAtDesc(experience.getId())
                .stream()
                .anyMatch(r -> r.getReviewer().getId().equals(reviewer.getId()));
        if (alreadyReviewed) {
            throw new BadRequestException("You have already reviewed this experience");
        }

        Review review = Review.builder()
                .experience(experience)
                .booking(request.getBookingId() != null ? bookingRepository.findById(request.getBookingId()).orElse(null) : null)
                .reviewer(reviewer)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();
        review = reviewRepository.save(review);

        return toReviewResponse(review);
    }

    public List<ReviewResponse> getByExperience(UUID experienceId) {
        return reviewRepository.findByExperienceIdOrderByCreatedAtDesc(experienceId)
                .stream()
                .map(this::toReviewResponse)
                .collect(Collectors.toList());
    }

    private ReviewResponse toReviewResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .experienceId(review.getExperience().getId())
                .reviewer(ReviewResponse.UserSummary.builder()
                        .id(review.getReviewer().getId())
                        .displayName(review.getReviewer().getDisplayName())
                        .profileImageUrl(review.getReviewer().getProfile() != null ? review.getReviewer().getProfile().getProfileImageUrl() : null)
                        .build())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
