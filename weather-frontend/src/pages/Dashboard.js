import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";
import { fetchWeather } from "../services/WeatherService";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchWeather();
      setWeather(data);
    };
    getData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

    </div>
  );
}
