import './App.css';
import { useEffect, useState } from "react";
// import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/weather")
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando clima...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clima de Ciudades</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Ciudad</th>
            <th>Temperatura</th>
            <th>Humedad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((city) => (
            <tr key={city.id}>
              <td>{city.city}</td>
              <td>{city.temperature}°C</td>
              <td>{city.humidity}%</td>
              <td>{city.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;