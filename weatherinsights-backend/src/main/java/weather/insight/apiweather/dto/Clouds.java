package weather.insight.apiweather.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Clouds {
    @JsonProperty("all")
    private Integer all;
}
