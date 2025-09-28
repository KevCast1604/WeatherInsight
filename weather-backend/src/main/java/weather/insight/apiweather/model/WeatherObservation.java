package weather.insight.apiweather.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "weather_observations")
public class  WeatherObservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private Double temperature;
    private Double feels_like;
    private Double temp_min;
    private Double temp_max;

    private Integer humidity;
    private Integer pressure;

    private Double windSpeed;
    private Integer windDeg;

    private Integer clouds;
    private Integer visibility;

    private LocalDateTime sunrise;
    private LocalDateTime sunset;

    private String description;
    private LocalDateTime timestamp;
}
