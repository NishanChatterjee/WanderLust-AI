package com.wanderlust.shared;

import java.io.Serializable;

/**
 * SHARED MODEL: TripRequest
 * Represents the immutable data for a booking initiation.
 * <p>
 * This record ensures that a valid request is always formed before reaching the
 * business logic.
 * </p>
 * 
 * @param flightId The ID of the flight to book (Must not be blank).
 * @param hotelId  The ID of the hotel to book (Must not be blank).
 * @param userId   The ID of the user booking the trip (Must not be blank).
 * @param amount   The total cost of the trip (Must be positive).
 */
public record TripRequest(String flightId, String hotelId, String userId, double amount) implements Serializable {

    /**
     * Compact Constructor for Validation.
     * Ensures we fail fast if invalid data is passed.
     */
    public TripRequest {
        if (flightId == null || flightId.isBlank()) {
            throw new IllegalArgumentException("Flight ID cannot be blank");
        }
        if (hotelId == null || hotelId.isBlank()) {
            throw new IllegalArgumentException("Hotel ID cannot be blank");
        }
        if (userId == null || userId.isBlank()) {
            throw new IllegalArgumentException("User ID cannot be blank");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }
    }
}
