package com.wanderlust.hotel;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HotelController {

    // Dummy hotel data with real Unsplash images
    private static final Map<String, List<Map<String, Object>>> DESTINATION_HOTELS = new HashMap<>() {
        {
            put("bali", List.of(
                    createHotel("The Ritz-Carlton Bali", 5, 450,
                            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                            List.of("Pool", "Spa", "Beach", "WiFi")),
                    createHotel("Four Seasons Resort Bali", 5, 520,
                            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
                            List.of("Private Villa", "Spa", "Pool", "Restaurant")),
                    createHotel("W Bali Seminyak", 5, 380,
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
                            List.of("Beachfront", "Club", "Pool", "Gym"))));
            put("paris", List.of(
                    createHotel("Le Meurice", 5, 680,
                            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
                            List.of("Eiffel View", "Spa", "Restaurant", "Butler")),
                    createHotel("Hôtel Plaza Athénée", 5, 720,
                            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
                            List.of("Luxury", "Spa", "Gourmet", "Concierge")),
                    createHotel("Shangri-La Paris", 5, 550,
                            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
                            List.of("River View", "Pool", "Fine Dining", "WiFi"))));
            put("tokyo", List.of(
                    createHotel("Park Hyatt Tokyo", 5, 480,
                            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
                            List.of("City View", "Pool", "Spa", "Bar")),
                    createHotel("The Peninsula Tokyo", 5, 520,
                            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
                            List.of("Imperial Palace View", "Spa", "Restaurant", "Limo")),
                    createHotel("Aman Tokyo", 5, 750,
                            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
                            List.of("Zen Design", "Spa", "Pool", "Private Dining"))));
            put("new york", List.of(
                    createHotel("The Plaza", 5, 650,
                            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
                            List.of("Central Park", "Spa", "Butler", "Restaurant")),
                    createHotel("The St. Regis New York", 5, 580,
                            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
                            List.of("Luxury", "Butler", "Restaurant", "Lounge")),
                    createHotel("Mandarin Oriental NYC", 5, 520,
                            "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&h=600&fit=crop",
                            List.of("City View", "Spa", "Pool", "Fine Dining"))));
        }
    };

    // Default hotels for unknown destinations
    private static final List<Map<String, Object>> DEFAULT_HOTELS = List.of(
            createHotel("Grand Resort & Spa", 5, 350,
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
                    List.of("Pool", "Spa", "WiFi", "Restaurant")),
            createHotel("Luxury Beach Hotel", 4, 280,
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
                    List.of("Beach", "Pool", "Bar", "Gym")),
            createHotel("City Center Hotel", 4, 220,
                    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
                    List.of("Central", "WiFi", "Restaurant", "Parking")));

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchHotels(
            @RequestParam String destination,
            @RequestParam(required = false) String checkIn,
            @RequestParam(required = false) String checkOut,
            @RequestParam(defaultValue = "1") int rooms,
            @RequestParam(defaultValue = "2") int guests) {

        String key = destination.toLowerCase().split(",")[0].trim();
        List<Map<String, Object>> hotels = DESTINATION_HOTELS.getOrDefault(key, DEFAULT_HOTELS);

        // Add dynamic data to hotels
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map<String, Object> hotel : hotels) {
            Map<String, Object> dynamicHotel = new HashMap<>(hotel);
            dynamicHotel.put("hotelId", UUID.randomUUID().toString());
            dynamicHotel.put("destination", destination);
            dynamicHotel.put("checkIn", checkIn);
            dynamicHotel.put("checkOut", checkOut);
            dynamicHotel.put("rooms", rooms);
            dynamicHotel.put("guests", guests);
            dynamicHotel.put("reviewScore", 4.5 + Math.random() * 0.5);
            dynamicHotel.put("reviewCount", 100 + (int) (Math.random() * 900));
            result.add(dynamicHotel);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<Map<String, Object>> getHotelDetails(@PathVariable String hotelId) {
        Map<String, Object> hotel = new HashMap<>(DEFAULT_HOTELS.get(0));
        hotel.put("hotelId", hotelId);
        hotel.put("description",
                "Experience luxury and comfort at our world-class resort. Featuring stunning views, exceptional dining, and personalized service.");
        hotel.put("policies", Map.of(
                "checkInTime", "15:00",
                "checkOutTime", "11:00",
                "cancellation", "Free cancellation up to 24 hours before check-in"));
        return ResponseEntity.ok(hotel);
    }

    private static Map<String, Object> createHotel(String name, int stars, int pricePerNight, String image,
            List<String> amenities) {
        Map<String, Object> hotel = new HashMap<>();
        hotel.put("name", name);
        hotel.put("stars", stars);
        hotel.put("pricePerNight", pricePerNight);
        hotel.put("currency", "USD");
        hotel.put("image", image);
        hotel.put("images", List.of(
                image,
                image.replace("w=800", "w=400"),
                image.replace("h=600", "h=400")));
        hotel.put("amenities", amenities);
        return hotel;
    }
}
