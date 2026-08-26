package com.roadnet.controller;

import com.roadnet.dto.request.BookingCreateRequest;
import com.roadnet.dto.response.BookingResponse;
import com.roadnet.entity.Payment;
import com.roadnet.service.BookingService;
import com.roadnet.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Tag(name = "Bookings", description = "Booking management")
public class BookingController {

    private final BookingService bookingService;
    private final PaymentService paymentService;

    @PostMapping
    @Operation(summary = "Create a new booking")
    public ResponseEntity<BookingResponse> createBooking(
            Authentication authentication,
            @Valid @RequestBody BookingCreateRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(authentication.getName(), request));
    }

    @GetMapping
    @Operation(summary = "Get my bookings")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getMyBookings(authentication.getName()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking by ID")
    public ResponseEntity<BookingResponse> getBookingById(
            Authentication authentication,
            @PathVariable UUID id) {
        return ResponseEntity.ok(bookingService.getBookingById(authentication.getName(), id));
    }

    @PutMapping("/{id}/confirm")
    @Operation(summary = "Confirm a booking")
    public ResponseEntity<BookingResponse> confirmBooking(
            Authentication authentication,
            @PathVariable UUID id) {
        return ResponseEntity.ok(bookingService.confirmBooking(authentication.getName(), id));
    }

    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel a booking")
    public ResponseEntity<BookingResponse> cancelBooking(
            Authentication authentication,
            @PathVariable UUID id) {
        return ResponseEntity.ok(bookingService.cancelBooking(authentication.getName(), id));
    }

    @PostMapping("/{id}/pay")
    @Operation(summary = "Pay for a booking (mock)")
    public ResponseEntity<Payment> payBooking(
            Authentication authentication,
            @PathVariable UUID id,
            @RequestParam(required = false) BigDecimal amount,
            @RequestParam(required = false) String currency,
            @RequestParam(required = false) String method) {
        return ResponseEntity.ok(paymentService.processMockPayment(authentication.getName(), id, amount, currency, method));
    }
}
