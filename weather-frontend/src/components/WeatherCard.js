import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Gauge, Thermometer, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchWeather } from './../services/WeatherService'; // Your existing service

export default function WeatherCard({ data }) {
  return (
    <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-xl rounded-2xl p-6 w-80 m-4 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{data.city}</h2>
            <p className="text-blue-100 capitalize flex items-center gap-2">
              <Cloud size={16} />
              {data.description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-light">{data.temperature}°</div>
            <div className="text-sm text-blue-100">Feels like {data.feels_like}°</div>
          </div>
        </div>
      </div>

      {/* Temperature range */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-100">Min</span>
          <div className="flex-1 mx-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-200 to-orange-300 rounded-full w-3/4"></div>
          </div>
          <span className="text-blue-100">Max</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-1">
          <span>{data.temp_min}°C</span>
          <span>{data.temp_max}°C</span>
        </div>
      </div>

      {/* Weather details */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <Droplets size={16} className="text-blue-200" />
            <span className="text-sm text-blue-100">Humidity</span>
          </div>
          <div className="text-xl font-semibold">{data.humidity}%</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <div className="flex items-center gap-2 mb-1">
            <Gauge size={16} className="text-blue-200" />
            <span className="text-sm text-blue-100">Pressure</span>
          </div>
          <div className="text-xl font-semibold">{data.pressure}</div>
          <div className="text-xs text-blue-200">hPa</div>
        </div>
      </div>
    </div>
  );
}

// Example component showing how to use it with your service
export function WeatherApp() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather();
      setWeatherData(data);
    } catch (err) {
      setError('Failed to load weather data');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600">
          <RefreshCw className="animate-spin" size={20} />
          Loading weather data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertCircle size={20} />
          {error}
        </div>
        <button 
          onClick={loadWeatherData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Weather Dashboard
      </h1>
      <div className="flex flex-wrap justify-center">
        {weatherData.map((data, index) => (
          <WeatherCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}