package com.wanderlust.hotel;

import com.wanderlust.shared.BookingResult;
import org.springframework.stereotype.Component;

import java.util.UUID;

public interface HotelGateway {
    BookingResult reserve(String hotelId);

    void cancel(String bookingId);
}

@Component
class HotelGatewayImpl implements HotelGateway {

    /**
     * EXT: END-TO-END FLOW - STEP 2b (Backend)
     * Requesting a hotel reservation.
     */
    @Override
    public BookingResult reserve(String hotelId) {
        // FLOW: Simulate Network Latency (500ms)
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // FLOW: Failure Simulation
        // If the ID starts with 'FAIL', we simulate outage.
        if (hotelId.toUpperCase().startsWith("FAIL")) {
            System.out.println("❌ Hotel reservation failed for: " + hotelId);
            return BookingResult.failed("Simulated Failure");
        }

        // FLOW: Success
        String bookingId = UUID.randomUUID().toString();
        System.out.println("✅ Hotel reserved: " + hotelId + " (Booking ID: " + bookingId + ")");
        return BookingResult.success(bookingId);
    }

    /**
     * EXT: END-TO-END FLOW - COMPENSATING TRANSACTION
     * If Payment fails, the Saga calls this to undo the hotel reservation.
     */
    @Override
    public void cancel(String bookingId) {
        System.out.println("⚠️ Compensating Transaction: Cancelled hotel booking: " + bookingId);
    }
}
