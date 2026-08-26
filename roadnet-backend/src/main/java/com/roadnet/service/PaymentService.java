package com.roadnet.service;

import com.roadnet.entity.*;
import com.roadnet.exception.BadRequestException;
import com.roadnet.exception.ResourceNotFoundException;
import com.roadnet.repository.BookingRepository;
import com.roadnet.repository.PaymentRepository;
import com.roadnet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public Payment processMockPayment(String email, UUID bookingId, BigDecimal amount, String currency, String method) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You can only pay for your own bookings");
        }

        boolean alreadyPaid = paymentRepository.findByBookingId(bookingId)
                .filter(p -> p.getStatus() == PaymentStatus.COMPLETED)
                .isPresent();
        if (alreadyPaid) {
            throw new BadRequestException("This booking has already been paid for");
        }

        String transactionRef = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Payment payment = Payment.builder()
                .booking(booking)
                .amount(amount != null ? amount : booking.getTotalPrice())
                .currency(currency != null ? currency : booking.getCurrency())
                .method(method != null ? method : "CARD")
                .status(PaymentStatus.COMPLETED)
                .transactionRef(transactionRef)
                .build();
        payment = paymentRepository.save(payment);

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        notificationService.create(user.getId(), NotificationType.PAYMENT_STATUS,
                "Payment Successful", "Your payment of " + payment.getAmount() + " " + payment.getCurrency() + " was successful",
                payment.getId().toString(), "PAYMENT");

        return payment;
    }
}
