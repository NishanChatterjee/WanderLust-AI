package com.wanderlust.order;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    /**
     * EXT: END-TO-END FLOW - CQRS (Read Model)
     * This controller represents the "Query" side of CQRS.
     * Unlike the "Order" side which handles complex transactions and sagas,
     * this side is optimized purely for reading data quickly.
     */
    @GetMapping("/{bookingId}")
    public Map<String, Object> getItinerary(@PathVariable String bookingId) {

        // FLOW: Mock Read Database Access
        // In a real system, the 'BookingConfirmedEvent' would have populated a
        // specialized 'ItineraryView' table (e.g., in Mongo or Elastic).
        // Here we just return mocked data.
        return Map.of(
                "bookingId", bookingId,
                "status", "CONFIRMED",
                "details", "Your trip to Paris includes flight F123 and Hotel H456.");
    }
}
