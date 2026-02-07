package com.wanderlust.notification;

import com.wanderlust.order.BookingConfirmedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class NotificationListener {

    /**
     * EXT: END-TO-END FLOW - STEP 5 (Backend)
     * Event Driven Architecture (EDA): This component listens for the
     * 'BookingConfirmedEvent'.
     * Ideally, this module could be in a separate microservice listening to
     * Kafka/RabbitMQ.
     */
    @EventListener
    @Async
    public void handleBookingConfirmed(BookingConfirmedEvent event) {
        // FLOW: Asynchronous Notification
        // We simulate sending an email here without blocking the main Order response.
        System.out.println("📧 Sending confirmation email to user " + event.userId() +
                " for Booking " + event.bookingId() +
                " (Flight: " + event.flightId() + ", Hotel: " + event.hotelId() + ")");
    }
}
