package weather.insight.apiweather.util;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
@Component
public class ApiClient {

    private final WebClient webClient;

    public ApiClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://api.openweathermap.org/data/2.5/weather").build();
    }

    public String getWeatherJson(String city, String apiKey) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("q", city)
                        .queryParam("units", "metric")
                        .queryParam("appid", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block(); // bloquea hasta recibir la respuesta
    }
}