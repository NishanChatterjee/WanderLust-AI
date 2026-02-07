package com.wanderlust.order;

import com.wanderlust.flight.FlightGateway;
import com.wanderlust.hotel.HotelGateway;
import com.wanderlust.payment.PaymentFailedException;
import com.wanderlust.payment.PaymentGateway;
import com.wanderlust.shared.TripRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderSaga {

    private final FlightGateway flightGateway;
    private final HotelGateway hotelGateway;
    private final PaymentGateway paymentGateway;
    private final org.springframework.context.ApplicationEventPublisher eventPublisher;

    /**
     * EXT: END-TO-END FLOW - STEP 2 (Backend)
     * The Saga Orchestrator: Coordinates the booking process.
     * It ensures data consistency across Flight, Hotel, and Payment.
     * 
     * @param request The trip details.
     */
    @Transactional
    public void bookTrip(TripRequest request) {
        System.out.println("🔄 SAGA STARTED: Booking trip for user " + request.userId());

        // FLOW: Step 2a - Reserve Flight
        // We call the Flight Module. If it fails, the Saga aborts immediately.
        var flightResult = flightGateway.reserve(request.flightId());
        if (!flightResult.isSuccess()) {
            System.out.println("❌ SAGA ABORT: Flight unavailable.");
            throw new RuntimeException("Flight unavailable");
        }

        // FLOW: Step 2b - Reserve Hotel
        // We call the Hotel Module. If it fails, we MUST undo the flight reservation.
        var hotelResult = hotelGateway.reserve(request.hotelId());
        if (!hotelResult.isSuccess()) {
            System.out.println("⚠️ SAGA COMPENSATE: Hotel unavailable. Rolling back flight.");

            // COMPENSATING TRANSACTION: Undo Step 1 (Cancel Flight)
            flightGateway.cancel(flightResult.bookingId());
            throw new RuntimeException("Hotel unavailable, flight cancelled");
        }

        // FLOW: Step 2c - Process Payment
        // The final step. If this fails, we undo EVERYTHING (Hotel + Flight).
        try {
            paymentGateway.charge(request.userId(), request.amount());

            // FLOW: Step 2d - Publish Event (EDA)
            // If we reach here, the booking is CONFIRMED. We let the world know.
            // This triggers the NotificationListener (Step 5).
            String orderId = java.util.UUID.randomUUID().toString();
            System.out.println("✅ SAGA SUCCESS: Order " + orderId + " confirmed.");

            eventPublisher.publishEvent(new BookingConfirmedEvent(
                    orderId,
                    request.userId(),
                    request.flightId(),
                    request.hotelId()));

        } catch (Exception e) {
            System.out.println("⚠️ SAGA COMPENSATE: Payment failed. Rolling back everything.");

            // COMPENSATING TRANSACTION: Undo Step 2 (Cancel Hotel) & Step 1 (Cancel Flight)
            hotelGateway.cancel(hotelResult.bookingId());
            flightGateway.cancel(flightResult.bookingId());
            throw new PaymentFailedException();
        }
    }
}
