package weather.insight.apiweather.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import weather.insight.apiweather.model.WeatherObservation;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WeatherHistorialRepository extends JpaRepository<WeatherObservation, Long> {
    List<WeatherObservation> findByCityAndTimestampAfter(String city, LocalDateTime timestamp);

}
