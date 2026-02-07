package com.wanderlust.flight;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FlightController {

    // Dummy airline data with images
    private static final List<Map<String, Object>> AIRLINES = List.of(
            Map.of("code", "AI", "name", "Air India", "logo",
                    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=100&h=100&fit=crop"),
            Map.of("code", "EK", "name", "Emirates", "logo",
                    "https://images.unsplash.com/photo-1540339832862-474599807836?w=100&h=100&fit=crop"),
            Map.of("code", "SQ", "name", "Singapore Airlines", "logo",
                    "https://images.unsplash.com/photo-1583202075829-2ec3a20a1d4d?w=100&h=100&fit=crop"),
            Map.of("code", "BA", "name", "British Airways", "logo",
                    "https://images.unsplash.com/photo-1569629743817-70d3c4a41c95?w=100&h=100&fit=crop"),
            Map.of("code", "LH", "name", "Lufthansa", "logo",
                    "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=100&h=100&fit=crop"));

    // Airport codes
    private static final Map<String, String> AIRPORTS = Map.of(
            "bali", "DPS",
            "paris", "CDG",
            "tokyo", "NRT",
            "new york", "JFK",
            "london", "LHR",
            "dubai", "DXB",
            "singapore", "SIN",
            "sydney", "SYD");

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam(required = false) String date,
            @RequestParam(defaultValue = "1") int passengers) {

        List<Map<String, Object>> flights = new ArrayList<>();
        String destCode = AIRPORTS.getOrDefault(destination.toLowerCase().split(",")[0].trim(), "XXX");
        String originCode = AIRPORTS.getOrDefault(origin.toLowerCase().split(",")[0].trim(), "DEL");

        LocalDate travelDate = date != null ? LocalDate.parse(date) : LocalDate.now().plusDays(7);

        // Generate 3-5 flight options
        int numFlights = 3 + (int) (Math.random() * 3);
        for (int i = 0; i < numFlights; i++) {
            Map<String, Object> airline = AIRLINES.get(i % AIRLINES.size());

            Map<String, Object> flight = new HashMap<>();
            flight.put("flightId", UUID.randomUUID().toString());
            flight.put("airline", airline);
            flight.put("flightNumber", airline.get("code") + "" + (100 + (int) (Math.random() * 900)));
            flight.put("origin",
                    Map.of("code", originCode, "city", origin, "terminal", "T" + (1 + (int) (Math.random() * 3))));
            flight.put("destination",
                    Map.of("code", destCode, "city", destination, "terminal", "T" + (1 + (int) (Math.random() * 2))));
            flight.put("departure", Map.of(
                    "date", travelDate.toString(),
                    "time", LocalTime.of(6 + i * 3, (int) (Math.random() * 60)).toString()));

            int durationHours = 4 + (int) (Math.random() * 10);
            int durationMinutes = (int) (Math.random() * 60);
            flight.put("duration", String.format("%dh %dm", durationHours, durationMinutes));
            flight.put("stops", i == 0 ? 0 : (int) (Math.random() * 2));
            flight.put("class", List.of("Economy", "Premium Economy", "Business").get(i % 3));
            flight.put("price", 400 + (int) (Math.random() * 800) + (i * 100));
            flight.put("currency", "USD");
            flight.put("seatsAvailable", 5 + (int) (Math.random() * 20));
            flight.put("refundable", i % 2 == 0);
            flight.put("baggage", Map.of(
                    "cabin", "7 kg",
                    "checkin", (i + 1) * 15 + " kg"));

            flights.add(flight);
        }

        return ResponseEntity.ok(flights);
    }

    @GetMapping("/{flightId}")
    public ResponseEntity<Map<String, Object>> getFlightDetails(@PathVariable String flightId) {
        // Return mock flight details
        Map<String, Object> airline = AIRLINES.get(0);

        Map<String, Object> flight = new HashMap<>();
        flight.put("flightId", flightId);
        flight.put("airline", airline);
        flight.put("flightNumber", airline.get("code") + "456");
        flight.put("status", "On Time");
        flight.put("aircraft", "Boeing 787 Dreamliner");

        return ResponseEntity.ok(flight);
    }
}
