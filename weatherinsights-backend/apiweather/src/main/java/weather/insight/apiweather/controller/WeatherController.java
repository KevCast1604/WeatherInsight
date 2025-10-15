package weather.insight.apiweather.controller;

import org.springframework.web.bind.annotation.*;
import weather.insight.apiweather.model.WeatherObservation;
import weather.insight.apiweather.repository.WeatherHistorialRepository;
import weather.insight.apiweather.service.WeatherService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class WeatherController {

    private final WeatherService weatherService;
    private final WeatherHistorialRepository weatherHistorialRepository;

    public WeatherController(WeatherService weatherService, WeatherHistorialRepository weatherHistorialRepository) {
        this.weatherService = weatherService;
        this.weatherHistorialRepository = weatherHistorialRepository;
    }

    // Endpoint que genera clima nuevo y lo imprime
    @GetMapping("/weather")
    public List<WeatherObservation> fetchWeather() {
        return weatherService.fetchCurrentWeather();
    }

    @GetMapping("/weather/history/{city}")
    public List<WeatherObservation> getWeatherHistory(
            @PathVariable String city,
            @RequestParam(defaultValue = "24") int hours) {
        LocalDateTime from = LocalDateTime.now().minusHours(hours);
        return weatherHistorialRepository.findByCityAndTimestampAfter(city, from);
    }
}
