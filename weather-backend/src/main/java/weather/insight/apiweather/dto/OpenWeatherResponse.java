package weather.insight.apiweather.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenWeatherResponse {
    private Long id;
    private String name; // ciudad
    private MainInfo main;
    private Wind wind;       // nuevo
    private Clouds clouds;   // nuevo
    private Integer visibility;
    private Sys sys;         // sunrise, sunset
    private List<WeatherDescription> weather; // 🔑 agregar para que getWeather() funcione

}
