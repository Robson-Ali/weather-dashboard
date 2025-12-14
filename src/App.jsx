import React, { useEffect, useState, useRef, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeatherByCity, fetchForecast } from './api/weather';

const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes (for clarity)
const STORAGE_KEY = 'wd:recent';

export default function App() {
  const [city, setCity] = useState('');
  const [units, setUnits] = useState('metric');
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState('');
  
  // Initialize recent searches from Local Storage (Good Practice)
  const [recent, setRecent] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  );

  const timerRef = useRef(null);

  // Core function to fetch weather data, memoized with useCallback for stability.
  // This is essential for the auto-refresh timer to work correctly without stale closures.
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

      // Update recent searches list (Stretch Goal)
      setRecent((r) =>
        [name, ...r.filter((x) => x.toLowerCase() !== name.toLowerCase())].slice(0, 6)
      );

      // Set up new auto-refresh timer (calls itself)
      timerRef.current = setInterval(() => load(name), REFRESH_INTERVAL);

    } catch (err) {
      setError(err.message || 'City not found or network error.');
      setCurrent(null);
      setDaily(null); // Clear weather data on error
    }
  }, [units]); // DEPENDENCY: Only re-create 'load' when 'units' changes

  // 1. Effect: Auto-refresh data when units change (FIXED DEPENDENCY)
  useEffect(() => {
    if (city) {
      // Reload weather using the new units setting
      load(city);
    }
  }, [units, load, city]); // DEPENDENCY: Recalculate if units, load, or city changes

  // 2. Effect: Save recent searches to Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 6)));
  }, [recent]);

  // 3. Effect: Cleanup auto-refresh timer on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []); // Runs only on mount and unmount

  // Event Handlers (Simple wrappers for the stable 'load' function)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          <div className="flex items-center gap-2">
            
            {/* Unit Toggle */}
            <button
              onClick={() => setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'))}
              className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Units: {units === 'metric' ? '°C / km/h' : '°F / mph'}
            </button>

            {/* Refresh Button */}
            <button 
              onClick={handleRefresh} 
              className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Refresh
            </button>
          </div>
        </header>

        <SearchBar
          onSearch={handleSearch}
          recent={recent}
          onSelectRecent={handleSelectRecent}
        />

        <ErrorMessage message={error} />

        {current && <WeatherCard city={city} weather={current} units={units} />}
        {daily && <ForecastCard daily={daily} units={units} />}

        <footer className="text-center text-sm text-gray-500 mt-8">
          Data from OpenWeatherMap
        </footer>
      </div>
    </div>
  );
}
