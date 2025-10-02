package weather.insight.apiweather.service;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import weather.insight.apiweather.dto.OpenWeatherResponse;
import weather.insight.apiweather.model.WeatherObservation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class WeatherScheduler {

    private final WeatherService service;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String API_KEY = "5b5307ba67466ed633cafc0601378d59";

    private final List<String> cities = List.of("Lima", "Santiago", "Buenos Aires", "Quito",
            "La Paz", "Bogota", "Montevideo", "Asuncion", "Brasilia");

    public WeatherScheduler(WeatherService service) {
        this.service = service;
    }

   @Scheduled(fixedRate = 5000) // cada 5 segundos
public void fetchWeather() {
    try { // <-- captura cualquier error general
        List<WeatherObservation> observations = new ArrayList<>();
        for (String city : cities) {
            try {
                String url = "https://api.openweathermap.org/data/2.5/weather?q="
                        + city + "&appid=" + API_KEY + "&units=metric";
                var response = restTemplate.getForObject(url, OpenWeatherResponse.class);
                WeatherObservation obs = new WeatherObservation();
                // Si vas a usar ID autogenerado, no asignes response.getId()
                // obs.setId(response.getId());
                obs.setCity(response.getName());
                obs.setTemperature(response.getMain().getTemp());
                obs.setHumidity(response.getMain().getHumidity());
                obs.setDescription(response.getWeather().get(0).getDescription());
                obs.setTimestamp(LocalDateTime.now());

                observations.add(obs);
            } catch (Exception e) {
                System.err.println("Error fetching " + city + ": " + e.getMessage());
                e.printStackTrace();
            }
        }

        // Guardar en DB
        try {
            service.saveAll(observations);
            System.out.println("Clima actualizado: " + LocalDateTime.now() + " - Observaciones: " + observations.size());
        } catch (Exception e) {
            System.err.println("Error guardando observaciones en la DB: " + e.getMessage());
            e.printStackTrace();
        }
    } catch (Exception e) {
        System.err.println("Error inesperado en scheduler: " + e.getMessage());
        e.printStackTrace();
    }
}


