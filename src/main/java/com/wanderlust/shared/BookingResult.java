package com.wanderlust.shared;

import java.io.Serializable;

/**
 * SHARED MODEL: BookingResult
 * The response object returned by External Service Gateways (Flight/Hotel).
 * Encapsulates the status of the operation and the resulting booking reference.
 */
public record BookingResult(Status status, String bookingId) implements Serializable {

    // --- Static Factory Methods for cleaner usage ---

    /**
     * Creates a successful result with a booking ID.
     */
    public static BookingResult success(String bookingId) {
        if (bookingId == null || bookingId.isBlank()) {
            throw new IllegalArgumentException("Success result must have a booking ID");
        }
        return new BookingResult(Status.SUCCESS, bookingId);
    }

    /**
     * Creates a failed result (no booking ID).
     */
    public static BookingResult failed(String reason) {
        // We could store the reason too but keeping it simple as per original spec
        return new BookingResult(Status.FAILED, null);
    }

    // --- Helper Methods ---

    /**
     * @return true if the booking was successful.
     */
    public boolean isSuccess() {
        return status == Status.SUCCESS;
    }
}
