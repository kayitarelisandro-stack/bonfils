package com.roadnet.service;

import com.roadnet.dto.request.BookingCreateRequest;
import com.roadnet.dto.response.BookingResponse;
import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ExperienceRepository experienceRepository;
    private final AvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final NotificationService notificationService;

    @Transactional
    public BookingResponse createBooking(String email, BookingCreateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Experience experience = experienceRepository.findById(request.getExperienceId())
                .orElseThrow(() -> new ResourceNotFoundException("Experience", "id", request.getExperienceId()));

        if (!experience.getIsActive()) {
            throw new BadRequestException("This experience is no longer available");
        }

        int participants = request.getParticipantsCount() != null ? request.getParticipantsCount() : 1;
        if (experience.getMaxParticipants() != null && participants > experience.getMaxParticipants()) {
            throw new BadRequestException("Number of participants exceeds maximum allowed");
        }

        if (request.getAvailabilityId() != null) {
            boolean doubleBooked = bookingRepository
                    .findByAvailabilityIdAndBookingDate(request.getAvailabilityId(), request.getBookingDate())
                    .stream()
                    .anyMatch(b -> b.getStatus() != BookingStatus.CANCELLED);
            if (doubleBooked) {
                throw new BadRequestException("This time slot is already booked");
            }
        }

        BigDecimal totalPrice = experience.getPrice() != null
                ? experience.getPrice().multiply(BigDecimal.valueOf(participants))
                : BigDecimal.ZERO;

        Booking booking = Booking.builder()
                .experience(experience)
                .user(user)
                .availability(request.getAvailabilityId() != null ? availabilityRepository.findById(request.getAvailabilityId()).orElse(null) : null)
                .bookingDate(request.getBookingDate())
                .timeSlot(request.getTimeSlot())
                .status(BookingStatus.PENDING)
                .participantsCount(participants)
                .totalPrice(totalPrice)
                .currency(experience.getCurrency())
                .specialRequests(request.getSpecialRequests())
                .build();
        booking = bookingRepository.save(booking);

        notificationService.create(experience.getProvider().getId(), NotificationType.BOOKING_RECEIVED,
                "New Booking", user.getDisplayName() + " booked " + experience.getTitle(),
                booking.getId().toString(), "BOOKING");

        return toBookingResponse(booking);
    }

    public List<BookingResponse> getMyBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toBookingResponse)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getProviderBookings(String email) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return bookingRepository.findByExperienceProviderIdOrderByCreatedAtDesc(provider.getId())
                .stream()
                .map(this::toBookingResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(String email, UUID bookingId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));
        return toBookingResponse(booking);
    }

    @Transactional
    public BookingResponse confirmBooking(String email, UUID bookingId) {
        User provider = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));

        if (!booking.getExperience().getProvider().getId().equals(provider.getId())) {
            throw new BadRequestException("Only the experience provider can confirm bookings");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        booking = bookingRepository.save(booking);

        notificationService.create(booking.getUser().getId(), NotificationType.BOOKING_CONFIRMED,
                "Booking Confirmed", "Your booking for " + booking.getExperience().getTitle() + " has been confirmed",
                booking.getId().toString(), "BOOKING");

        return toBookingResponse(booking);
    }

    @Transactional
    public BookingResponse cancelBooking(String email, UUID bookingId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));

        boolean isOwner = booking.getUser().getId().equals(user.getId());
        boolean isProvider = booking.getExperience().getProvider().getId().equals(user.getId());

        if (!isOwner && !isProvider) {
            throw new BadRequestException("You can only cancel your own bookings");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        booking = bookingRepository.save(booking);

        UUID notifyUserId = isOwner ? booking.getExperience().getProvider().getId() : booking.getUser().getId();
        notificationService.create(notifyUserId, NotificationType.BOOKING_CANCELLED,
                "Booking Cancelled", "A booking has been cancelled",
                booking.getId().toString(), "BOOKING");

        return toBookingResponse(booking);
    }

    private BookingResponse toBookingResponse(Booking booking) {
        boolean isPaid = paymentRepository.findByBookingId(booking.getId())
                .filter(p -> p.getStatus() == PaymentStatus.COMPLETED)
                .isPresent();

        return BookingResponse.builder()
                .id(booking.getId())
                .experience(BookingResponse.ExperienceSummary.builder()
                        .id(booking.getExperience().getId())
                        .title(booking.getExperience().getTitle())
                        .location(booking.getExperience().getLocation())
                        .price(booking.getExperience().getPrice())
                        .build())
                .user(BookingResponse.UserSummary.builder()
                        .id(booking.getUser().getId())
                        .displayName(booking.getUser().getDisplayName())
                        .profileImageUrl(booking.getUser().getProfile() != null ? booking.getUser().getProfile().getProfileImageUrl() : null)
                        .build())
                .bookingDate(booking.getBookingDate())
                .timeSlot(booking.getTimeSlot())
                .status(booking.getStatus())
                .participantsCount(booking.getParticipantsCount())
                .totalPrice(booking.getTotalPrice())
                .currency(booking.getCurrency())
                .specialRequests(booking.getSpecialRequests())
                .isPaid(isPaid)
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
