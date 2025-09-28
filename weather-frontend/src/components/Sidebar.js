import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  BarChart3,
  Cloud,
  Settings,
  User,
  Bell,
  Search,
  MapPin,
  TrendingUp,
  Calendar,
} from "lucide-react";

import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";
import { fetchWeather } from "../services/WeatherService";

export default function AnimatedSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchWeather();
      setWeather(data);
    };
    getData();
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Cities Comparison" },
    { icon: Cloud, label: "City History" },
    { icon: MapPin, label: "Map" },
    { icon: Bell, label: "Notifications", badge: "12" },
    { icon: Settings, label: "Settings" },
    { icon: User, label: "Profile" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" relative overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
        text-white shadow-2xl z-40 transition-all duration-300 ease-in-out
        ${isOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full lg:translate-x-0 lg:w-20 hover:w-72"}
        group
      `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div
            className={`flex items-center space-x-3 transition-all duration-300 ${
              !isOpen && "lg:group-hover:justify-start lg:justify-center"
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cloud size={20} className="text-white" />
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                !isOpen &&
                "lg:group-hover:opacity-100 lg:group-hover:w-auto lg:opacity-0 lg:w-0"
              }`}
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                WeatherInsights
              </h2>
              <p className="text-xs text-slate-400">Climate Analytics Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <a
                    href="#"
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group/item
                      ${
                        item.active
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg"
                          : "hover:bg-slate-700/50 hover:border-slate-600/50 border border-transparent text-slate-300 hover:text-white"
                      }
                      ${!isOpen && "lg:group-hover:justify-start lg:justify-center"}
                    `}
                  >
                    <div className="flex-shrink-0 relative">
                      <Icon
                        size={20}
                        className={`transition-colors duration-200 ${
                          item.active
                            ? "text-blue-400"
                            : "group-hover/item:text-blue-400"
                        }`}
                      />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${
                        !isOpen &&
                        "lg:group-hover:opacity-100 lg:group-hover:w-auto lg:opacity-0 lg:w-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div
          className={`p-4 border-t border-slate-700/50 transition-all duration-300 ${
            !isOpen && "lg:group-hover:opacity-100 lg:opacity-0"
          }`}
        >
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">john.doe@example.com</p>
            </div>
          </div>
        </div>

        {/* Collapse indicator */}
        <div
          className={`absolute top-1/2 -right-3 w-6 h-12 bg-slate-800 rounded-r-full border-r border-t border-b border-slate-700 
                        flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-all duration-200
                        ${!isOpen && "lg:group-hover:opacity-100 lg:opacity-0"} hidden lg:flex`}
          onClick={toggleSidebar}
        >
          <div className="w-1 h-6 bg-slate-600 rounded-full"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="max-w-full overflow-hidden"
      >
        <div className="p-8 min-h-screen bg-gray-50 w-screen max-w-full" >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-500 mb-6 ">
              Weather Insight Dashboard
            </h1>

            {/* Weather Cards */}
            <div className=" grid grid-rows-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
              {weather.map((w) => (
                <WeatherCard key={w.id} data={w} />
              ))}
            </div>

            {/* Weather Charts */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
              <WeatherChart data={weather} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
