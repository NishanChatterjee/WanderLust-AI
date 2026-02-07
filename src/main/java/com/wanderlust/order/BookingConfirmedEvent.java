package com.wanderlust.order;

/**
 * DOMAIN EVENT
 * Published when a trip is successfully booked and paid for.
 * Listened to by the Notification service.
 */
public record BookingConfirmedEvent(String bookingId, String userId, String flightId, String hotelId) {
}
