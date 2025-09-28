import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';

import { TrendingUp, BarChart3, Thermometer } from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

export default function WeatherChart({ data }) {
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(['temperature', 'humidity']);

  // Color palette for different metrics
  const colors = {
    temperature: {
      border: 'rgba(239, 68, 68, 0.8)',
      background: 'rgba(239, 68, 68, 0.1)',
      gradient: 'rgba(239, 68, 68, 0.3)'
    },
    humidity: {
      border: 'rgba(59, 130, 246, 0.8)',
      background: 'rgba(59, 130, 246, 0.1)',
      gradient: 'rgba(59, 130, 246, 0.3)'
    },
    pressure: {
      border: 'rgba(16, 185, 129, 0.8)',
      background: 'rgba(16, 185, 129, 0.1)',
      gradient: 'rgba(16, 185, 129, 0.3)'
    },
    feels_like: {
      border: 'rgba(245, 158, 11, 0.8)',
      background: 'rgba(245, 158, 11, 0.1)',
      gradient: 'rgba(245, 158, 11, 0.3)'
    }
  };

  // Helper functions for dynamic scaling
  const getMaxValue = () => {
    let maxVal = 0;
    selectedMetrics.forEach(metric => {
      const values = data.map(d => d[metric] || 0);
      const max = Math.max(...values);
      maxVal = Math.max(maxVal, max);
    });
    
    // Round up to nearest appropriate value based on metric type
    if (selectedMetrics.includes('pressure')) {
      return Math.ceil(maxVal / 500) * 500; // Round up to nearest 500
    } else if (selectedMetrics.includes('humidity')) {
      return 100; // Humidity max is always 100%
    } else {
      return Math.ceil(maxVal / 10) * 10; // Round up to nearest 10 for temperature
    }
  };

  const getStepSize = () => {
    if (selectedMetrics.includes('pressure')) {
      return 500; // Steps of 500 for pressure
    } else if (selectedMetrics.includes('humidity')) {
      return 20; // Steps of 20 for humidity
    } else {
      return 5; // Steps of 5 for temperature
    }
  };

  // Create datasets based on selected metrics
  const createDatasets = () => {
    const datasets = [];

    if (selectedMetrics.includes('temperature')) {
      datasets.push({
        label: "Temperature (°C)",
        data: data.map(d => d.temperature),
        borderColor: colors.temperature.border,
        backgroundColor: chartType === 'line' ? colors.temperature.gradient : colors.temperature.background,
        borderWidth: 3,
        fill: chartType === 'line',
        tension: 0.4,
        pointBackgroundColor: colors.temperature.border,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      });
    }

    if (selectedMetrics.includes('humidity')) {
      datasets.push({
        label: "Humidity (%)",
        data: data.map(d => d.humidity),
        borderColor: colors.humidity.border,
        backgroundColor: chartType === 'line' ? colors.humidity.gradient : colors.humidity.background,
        borderWidth: 3,
        fill: chartType === 'line',
        tension: 0.4,
        pointBackgroundColor: colors.humidity.border,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      });
    }

    if (selectedMetrics.includes('pressure')) {
      datasets.push({
        label: "Pressure (hPa)",
        data: data.map(d => d.pressure),
        borderColor: colors.pressure.border,
        backgroundColor: chartType === 'line' ? colors.pressure.gradient : colors.pressure.background,
        borderWidth: 3,
        fill: chartType === 'line',
        tension: 0.4,
        pointBackgroundColor: colors.pressure.border,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      });
    }

    if (selectedMetrics.includes('feels_like')) {
      datasets.push({
        label: "Feels Like (°C)",
        data: data.map(d => d.feels_like),
        borderColor: colors.feels_like.border,
        backgroundColor: chartType === 'line' ? colors.feels_like.gradient : colors.feels_like.background,
        borderWidth: 3,
        fill: chartType === 'line',
        tension: 0.4,
        pointBackgroundColor: colors.feels_like.border,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      });
    }

    return datasets;
  };

  const chartData = {
    labels: data.map(d => d.city),
    datasets: createDatasets()
  };

  // Enhanced chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Weather Data Overview',
        font: {
          size: 18,
          weight: '600'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const unit = label.includes('Temperature') || label.includes('Feels') ? '°C' : 
                        label.includes('Humidity') ? '%' : 
                        label.includes('Pressure') ? ' hPa' : '';
            return `${label}: ${value}${unit}`;
          }
        }
      }
    },
    scales: chartType !== 'radar' ? {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '500'
          }
        }
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: getMaxValue(),
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1
        },
        ticks: {
          stepSize: getStepSize(),
          font: {
            size: 11
          },
          callback: function(value) {
            return value;
          }
        }
      }
    } : {
      r: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        borderJoinStyle: 'round'
      }
    }
  };

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const renderChart = () => {
    switch(chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      default:
        return <Line data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 m-4">
      {/* Chart Controls */}
      <div className="mb-6 space-y-4">
        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              chartType === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp size={16} />
            Line Chart
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              chartType === 'bar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 size={16} />
            Bar Chart
          </button>
        </div>

        {/* Metric Selector */}
        {chartType !== 'radar' && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600 py-2">Show Metrics:</span>
            {['temperature', 'humidity', 'pressure', 'feels_like'].map(metric => (
              <button
                key={metric}
                onClick={() => toggleMetric(metric)}
                className={`px-3 py-1 text-sm rounded-full transition-colors capitalize ${
                  selectedMetrics.includes(metric)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {metric.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="h-96 w-full">
        {data && data.length > 0 ? (
          renderChart()
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Thermometer size={48} className="mx-auto mb-2 opacity-50" />
              <p>No weather data available</p>
            </div>
          </div>
        )}
      </div>

      {/* Data Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600">Cities</p>
          <p className="text-lg font-semibold">{data?.length || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Avg Temp</p>
          <p className="text-lg font-semibold">
            {data?.length ? Math.round(data.reduce((sum, d) => sum + d.temperature, 0) / data.length) : 0}°C
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Avg Humidity</p>
          <p className="text-lg font-semibold">
            {data?.length ? Math.round(data.reduce((sum, d) => sum + d.humidity, 0) / data.length) : 0}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Avg Pressure</p>
          <p className="text-lg font-semibold">
            {data?.length ? Math.round(data.reduce((sum, d) => sum + d.pressure, 0) / data.length) : 0} hPa
          </p>
        </div>
      </div>
    </div>
  );
}