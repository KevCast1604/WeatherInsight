package weather.insight.apiweather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Wind {
    private Double speed;

    @JsonProperty("deg")
    private Integer deg;
}