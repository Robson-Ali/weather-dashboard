import React, { useEffect, useState, useRef, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import ErrorMessage from '../components/ErrorMessage';
import { fetchWeatherByCity, fetchForecast } from '../api/weather';

const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes
const STORAGE_KEY = 'wd:recent';

// This is the main Weather functionality page.
export default function WeatherPage() {
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

  // Effect 1: Auto-refresh data when units change (Uses load, city, units dependencies)
  useEffect(() => {
    if (city) {
      load(city);
    }
  }, [units, load, city]);

  // Effect 2: Save recent searches to Local Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 6)));
  }, [recent]);

  // Effect 3: Cleanup auto-refresh timer on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []); 

  // Event Handlers
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
    // We are removing the 'min-h-screen' and 'max-w-4xl' classes 
    // and letting the Layout component manage the overall page structure.
    <div className="flex flex-col gap-6"> 
      
      {/* Page Title & Controls (Local to this page) */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-700">Live Weather Search</h2>
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
            className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold text-sm hover:bg-gray-300 transition"
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

      {/* Weather Display Components */}
      {current && <WeatherCard city={city} weather={current} units={units} />}
      {daily && <ForecastCard daily={daily} units={units} />}
      
      {/* Removed the footer to prevent duplication if the Layout has one */}
    </div>
  );
}