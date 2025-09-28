package weather.insight.apiweather.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import weather.insight.apiweather.model.WeatherObservation;

@Repository
public interface WeatherObservationRepository extends JpaRepository<WeatherObservation, Long> {
}