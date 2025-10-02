package weather.insight.apiweather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ApiweatherApplication {

	public static void main(String[] args)
    {
		SpringApplication.run(ApiweatherApplication.class, args);
	}

}
