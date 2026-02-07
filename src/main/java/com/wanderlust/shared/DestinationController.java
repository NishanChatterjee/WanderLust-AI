package com.wanderlust.shared;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    private static final List<Map<String, Object>> FEATURED_DESTINATIONS = List.of(
            createDestination("Bali", "Indonesia", "Experience tropical paradise with stunning temples and beaches",
                    899, "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
                    List.of("Beach", "Culture", "Adventure")),
            createDestination("Paris", "France", "The city of love with iconic landmarks and world-class cuisine",
                    1299, "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
                    List.of("Romance", "History", "Food")),
            createDestination("Tokyo", "Japan", "A blend of ultra-modern and traditional Japanese culture",
                    1599, "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
                    List.of("Culture", "Technology", "Food")),
            createDestination("New York", "USA", "The city that never sleeps with iconic skyline and attractions",
                    1099, "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
                    List.of("Shopping", "Entertainment", "Food")),
            createDestination("Maldives", "Maldives", "Pristine beaches and luxury overwater villas",
                    1899, "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
                    List.of("Beach", "Luxury", "Romance")),
            createDestination("Dubai", "UAE", "Futuristic architecture and world-class shopping",
                    899, "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
                    List.of("Luxury", "Shopping", "Adventure")),
            createDestination("London", "UK", "Historic landmarks, royal palaces, and vibrant culture",
                    999, "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
                    List.of("History", "Culture", "Shopping")),
            createDestination("Singapore", "Singapore", "Garden city with stunning architecture and food scene",
                    1199, "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
                    List.of("Food", "Shopping", "Culture")));

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getFeaturedDestinations() {
        return ResponseEntity.ok(FEATURED_DESTINATIONS);
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<Map<String, Object>> getDestinationDetails(@PathVariable String destinationId) {
        return FEATURED_DESTINATIONS.stream()
                .filter(d -> d.get("id").equals(destinationId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchDestinations(@RequestParam String query) {
        String q = query.toLowerCase();
        List<Map<String, Object>> results = FEATURED_DESTINATIONS.stream()
                .filter(d -> ((String) d.get("name")).toLowerCase().contains(q) ||
                        ((String) d.get("country")).toLowerCase().contains(q) ||
                        ((List<String>) d.get("tags")).stream().anyMatch(tag -> tag.toLowerCase().contains(q)))
                .toList();
        return ResponseEntity.ok(results);
    }

    private static Map<String, Object> createDestination(String name, String country, String description,
            int priceFrom, String image, List<String> tags) {
        Map<String, Object> dest = new HashMap<>();
        dest.put("id", name.toLowerCase().replace(" ", "-"));
        dest.put("name", name);
        dest.put("country", country);
        dest.put("description", description);
        dest.put("priceFrom", priceFrom);
        dest.put("currency", "USD");
        dest.put("image", image);
        dest.put("images", List.of(
                image,
                image.replace("w=800", "w=600").replace("h=600", "h=400")));
        dest.put("tags", tags);
        dest.put("rating", 4.5 + Math.random() * 0.5);
        dest.put("reviewCount", 500 + (int) (Math.random() * 1500));
        return dest;
    }
}
