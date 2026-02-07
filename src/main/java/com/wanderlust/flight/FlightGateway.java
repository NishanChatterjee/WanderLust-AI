package com.wanderlust.flight;

import com.wanderlust.shared.BookingResult;
import org.springframework.stereotype.Component;

import java.util.UUID;

public interface FlightGateway {
    BookingResult reserve(String flightId);

    void cancel(String bookingId);
}

@Component
class FlightGatewayImpl implements FlightGateway {

    /**
     * EXT: END-TO-END FLOW - STEP 2a (Backend)
     * Requesting a flight reservation from the external system.
     */
    @Override
    public BookingResult reserve(String flightId) {
        // FLOW: Simulate Network Latency (500ms)
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // FLOW: Failure Simulation
        // If the ID starts with 'FAIL', we simulate an external reject.
        if (flightId.toUpperCase().startsWith("FAIL")) {
            System.out.println("❌ Flight reservation failed for: " + flightId);
            return BookingResult.failed("Simulated Failure");
        }

        // FLOW: Success
        String bookingId = UUID.randomUUID().toString();
        System.out.println("✅ Flight reserved: " + flightId + " (Booking ID: " + bookingId + ")");
        return BookingResult.success(bookingId);
    }

    /**
     * EXT: END-TO-END FLOW - COMPENSATING TRANSACTION
     * If functionality downstream fails (e.g., Hotel or Payment), the Saga calls
     * this
     * to undo the flight reservation.
     */
    @Override
    public void cancel(String bookingId) {
        System.out.println("⚠️ Compensating Transaction: Cancelled flight booking: " + bookingId);
    }
}
