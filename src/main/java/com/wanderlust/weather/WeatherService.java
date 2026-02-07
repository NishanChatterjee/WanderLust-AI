package com.wanderlust.weather;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeatherService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // City to coordinates mapping for popular destinations
    private static final Map<String, double[]> CITY_COORDINATES = new HashMap<>() {
        {
            put("bali", new double[] { -8.4095, 115.1889 });
            put("paris", new double[] { 48.8566, 2.3522 });
            put("tokyo", new double[] { 35.6762, 139.6503 });
            put("new york", new double[] { 40.7128, -74.0060 });
            put("london", new double[] { 51.5074, -0.1278 });
            put("dubai", new double[] { 25.2048, 55.2708 });
            put("singapore", new double[] { 1.3521, 103.8198 });
            put("sydney", new double[] { -33.8688, 151.2093 });
            put("rome", new double[] { 41.9028, 12.4964 });
            put("barcelona", new double[] { 41.3851, 2.1734 });
            put("amsterdam", new double[] { 52.3676, 4.9041 });
            put("maldives", new double[] { 3.2028, 73.2207 });
            put("thailand", new double[] { 13.7563, 100.5018 });
            put("switzerland", new double[] { 46.9480, 7.4474 });
            put("greece", new double[] { 37.9838, 23.7275 });
        }
    };

    /**
     * REAL WEATHER API: Open-Meteo (free, no auth required)
     * Protected by Resilience4j Circuit Breaker
     */
    @CircuitBreaker(name = "weatherService", fallbackMethod = "fallbackWeather")
    public Map<String, Object> getWeather(String city) {
        // Test triggers for circuit breaker demo
        if ("TimeoutCity".equalsIgnoreCase(city)) {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            throw new RuntimeException("Service Timeout");
        }
        if ("ErrorCity".equalsIgnoreCase(city)) {
            throw new RuntimeException("API Error");
        }

        // Get coordinates for city
        double[] coords = CITY_COORDINATES.getOrDefault(
                city.toLowerCase().split(",")[0].trim(),
                new double[] { 28.6139, 77.2090 } // Default to Delhi
        );

        // Call Open-Meteo API (FREE, no auth needed)
        String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%.4f&longitude=%.4f&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto",
                coords[0], coords[1]);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode current = root.get("current");

            Map<String, Object> weather = new HashMap<>();
            weather.put("city", city);
            weather.put("temperature", current.get("temperature_2m").asDouble());
            weather.put("humidity", current.get("relative_humidity_2m").asInt());
            weather.put("windSpeed", current.get("wind_speed_10m").asDouble());
            weather.put("condition", getWeatherCondition(current.get("weather_code").asInt()));
            weather.put("source", "Open-Meteo");

            log.info("✅ Weather fetched for {}: {}°C", city, weather.get("temperature"));
            return weather;

        } catch (Exception e) {
            log.error("Weather API error: {}", e.getMessage());
            throw new RuntimeException("Weather API failed", e);
        }
    }

    /**
     * Fallback when Circuit Breaker is OPEN or API fails
     */
    public Map<String, Object> fallbackWeather(String city, Throwable t) {
        log.warn("⚠️ Circuit Breaker / Fallback triggered for city: {} - {}", city, t.getMessage());

        Map<String, Object> fallback = new HashMap<>();
        fallback.put("city", city);
        fallback.put("temperature", 25);
        fallback.put("humidity", 60);
        fallback.put("windSpeed", 12);
        fallback.put("condition", "Sunny");
        fallback.put("source", "Fallback (Service Unavailable)");
        fallback.put("circuitBreakerActive", true);

        return fallback;
    }

    private String getWeatherCondition(int code) {
        // WMO Weather interpretation codes
        if (code == 0)
            return "Clear Sky";
        if (code <= 3)
            return "Partly Cloudy";
        if (code <= 49)
            return "Foggy";
        if (code <= 59)
            return "Drizzle";
        if (code <= 69)
            return "Rain";
        if (code <= 79)
            return "Snow";
        if (code <= 99)
            return "Thunderstorm";
        return "Unknown";
    }
}
