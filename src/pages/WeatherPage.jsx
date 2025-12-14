import React, { useEffect, useState, useRef, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import ErrorMessage from '../components/ErrorMessage';
import { fetchWeatherByCity, fetchForecast } from '../api/weather';

import { useTheme } from '../context/ThemeContext'; 

const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes
const STORAGE_KEY = 'wd:recent';
const DEFAULT_CITY_KEY = 'wd:defaultCity'; // 🛑 NEW: Key for default city storage

export default function WeatherPage() {
  const { theme } = useTheme();

  const [city, setCity] = useState('');
  const [units, setUnits] = useState('metric');
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState('');
  
  const [recent, setRecent] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  );

  const timerRef = useRef(null);

  // Core function to fetch weather data, memoized with useCallback for stability.
  const load = useCallback(async (cityName) => {
    setError('');
    
    // Clear any existing auto-refresh timer immediately
    clearInterval(timerRef.current);

    try {
      // 1. Get current weather and coordinates
      const data = await fetchWeatherByCity(cityName, units);
      const { coord, name } = data;

      // 2. Get forecast using coordinates
      const forecast = await fetchForecast(coord.lat, coord.lon, units);

      // Update states
      setCity(name);
      setCurrent(data);
      setDaily(forecast);

      // Update recent searches list
      setRecent((r) =>
        [name, ...r.filter((x) => x.toLowerCase() !== name.toLowerCase())].slice(0, 6)
      );

      // Set up new auto-refresh timer (calls itself)
      timerRef.current = setInterval(() => load(name), REFRESH_INTERVAL);

    } catch (err) {
      setError(err.message || 'City not found or network error.');
      setCurrent(null);
      setDaily(null);
    }
  }, [units]); 

  
  // Effect 1: INITIAL LOAD LOGIC (Checks for Default City or reloads on unit change)
  useEffect(() => {
    // 🛑 If a city is already loaded, reload it when units change.
    if (city) {
      load(city);
    } else {
      // 🛑 If no city is loaded, check for a default city on initial mount.
      const defaultCityName = localStorage.getItem(DEFAULT_CITY_KEY);
      if (defaultCityName) {
        load(defaultCityName);
      }
    }
  }, [units, load]); // Only include units and load, excluding 'city' to avoid infinite loops when city is set by load()

  // Effect 2: Save recent searches to Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 6)));
  }, [recent]);

  // Effect 3: Cleanup auto-refresh timer on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []); 

  // Event Handlers (Unchanged)
  function handleSearch(q) {
    load(q);
  }

  function handleSelectRecent(r) {
    load(r);
  }

  function handleRefresh() {
    if (!city) return;
    load(city);
  }

  // Theming Logic for local component elements (Unchanged from previous step)
  const headerClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-200 border-gray-700' 
    : 'bg-white text-gray-700 border-gray-100';

  const titleClasses = theme === 'dark' ? 'text-gray-100' : 'text-gray-700';

  const refreshButtonClasses = theme === 'dark' 
    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';


  return (
    <div className="flex flex-col gap-6"> 
      
      {/* Page Title & Controls */}
      <header className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg shadow-sm border ${headerClasses}`}>
        <h2 className={`text-2xl font-bold ${titleClasses}`}>Live Weather Search</h2>
        <div className="flex items-center gap-2">
            
          {/* Unit Toggle */}
          <button
            onClick={() => setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'))}
            className="px-3 py-1 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition"
          >
            Units: {units === 'metric' ? '°C / km/h' : '°F / mph'}
          </button>

          {/* Refresh Button */}
          <button 
            onClick={handleRefresh} 
            className={`px-3 py-1 rounded-full font-semibold text-sm transition ${refreshButtonClasses}`}
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Search Bar & Error Message */}
      <SearchBar
        onSearch={handleSearch}
        recent={recent}
        onSelectRecent={handleSelectRecent}
      />

      <ErrorMessage message={error} />

      {/* Weather Display Components */}
      {current && <WeatherCard city={city} weather={current} units={units} />}
      {daily && <ForecastCard daily={daily} units={units} />}
      
    </div>
  );
}