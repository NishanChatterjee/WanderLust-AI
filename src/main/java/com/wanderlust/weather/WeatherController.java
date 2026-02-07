package com.wanderlust.weather;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/{city}")
    public ResponseEntity<Map<String, Object>> getWeather(@PathVariable String city) {
        Map<String, Object> weather = weatherService.getWeather(city);
        return ResponseEntity.ok(weather);
    }
}
