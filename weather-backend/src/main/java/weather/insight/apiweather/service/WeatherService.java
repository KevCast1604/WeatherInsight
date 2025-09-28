package weather.insight.apiweather.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import weather.insight.apiweather.model.WeatherObservation;
import weather.insight.apiweather.repository.WeatherObservationRepository;
import weather.insight.apiweather.dto.*;

import jakarta.transaction.Transactional;
import weather.insight.apiweather.repository.WeatherHistorialRepository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherService {
    private final WeatherObservationRepository weatherObservationRepository;
    private final WeatherHistorialRepository weatherHistorialRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openweather.api.key}")
    private String apiKey;

    // lista de ciudades a consultar (id o nombre)
    private final List<String> cities = List.of("Lima", "Santiago", "Buenos Aires", "London");

    public WeatherService(WeatherObservationRepository weatherObservationRepository,
                          WeatherHistorialRepository weatherHistorialRepository) {
        this.weatherObservationRepository = weatherObservationRepository;
        this.weatherHistorialRepository = weatherHistorialRepository;
    }

    @Transactional
    public void saveAll(List<WeatherObservation> observations) {
        for (WeatherObservation o : observations) {
            if (o.getTimestamp() == null) {
                o.setTimestamp(LocalDateTime.now());
            }
        }
        weatherObservationRepository.saveAll(observations);
    }

    public List<WeatherObservation> getAll() {
        return weatherObservationRepository.findAll();
    }

    public List<WeatherObservation> getHistory(String city, int hours) {
        LocalDateTime from = LocalDateTime.now().minusHours(hours);
        return weatherHistorialRepository.findByCityAndTimestampAfter(city, from);
    }

    // 🔑 Nuevo método: obtiene clima actual de varias ciudades
    public List<WeatherObservation> fetchCurrentWeather() {
        List<WeatherObservation> observations = new ArrayList<>();
        // ObjectMapper mapper = new ObjectMapper(); // Para imprimir como JSON

        for (String city : cities) {
            String url = String.format(
                    "https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric",
                    city, apiKey
            );



            try {
                OpenWeatherResponse response = restTemplate.getForObject(url, OpenWeatherResponse.class);

                if (response != null) {
                    /* 🔹 Imprimir la respuesta completa de la API en consola
                    System.out.println("=== Weather API Response for " + city + " ===");
                    System.out.println(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(response));
                    */
                    WeatherObservation weather = new WeatherObservation(); // 🔑 crear instancia

                    weather.setCity(response.getName());

                    weather.setTemperature(response.getMain() != null && response.getMain().getTemp() != null
                            ? response.getMain().getTemp() : 0.0);

                    weather.setFeels_like(response.getMain() != null && response.getMain().getFeelsLike() != null
                            ? response.getMain().getFeelsLike() : 0.0);

                    weather.setTemp_min(response.getMain() != null && response.getMain().getTempMin() != null
                            ? response.getMain().getTempMin() : 0.0);

                    weather.setTemp_max(response.getMain() != null && response.getMain().getTempMax() != null
                            ? response.getMain().getTempMax() : 0.0);

                    weather.setHumidity(response.getMain() != null && response.getMain().getHumidity() != null
                            ? response.getMain().getHumidity() : 0);

                    weather.setPressure(response.getMain() != null && response.getMain().getPressure() != null
                            ? response.getMain().getPressure() : 0);

                    weather.setClouds(response.getClouds() != null && response.getClouds().getAll() != null
                            ? response.getClouds().getAll() : 0);

                    weather.setWindDeg(response.getWind() != null && response.getWind().getDeg() != null
                            ? response.getWind().getDeg() : 0);

                    weather.setWindSpeed(response.getWind() != null && response.getWind().getSpeed() != null
                            ? response.getWind().getSpeed() : 0.0);

                    weather.setVisibility(response.getVisibility() != null ? response.getVisibility() : 0);

                    weather.setSunrise(response.getSys() != null && response.getSys().getSunrise() != null
                            ? Instant.ofEpochSecond(response.getSys().getSunrise())
                            .atZone(ZoneId.systemDefault()).toLocalDateTime()
                            : null);

                    weather.setSunset(response.getSys() != null && response.getSys().getSunset() != null
                            ? Instant.ofEpochSecond(response.getSys().getSunset())
                            .atZone(ZoneId.systemDefault()).toLocalDateTime()
                            : null);

                    weather.setDescription(response.getWeather() != null && !response.getWeather().isEmpty()
                            ? response.getWeather().get(0).getDescription() : "");

                    weather.setTimestamp(LocalDateTime.now());

                    observations.add(weather);
                }
            } catch (Exception e) {
                System.err.println("Error fetching weather for city: " + city);
                e.printStackTrace();
            }
        }

        // Guardar en BD
        saveAll(observations);

        return observations;
    }
}
