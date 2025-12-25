import React, { useEffect, useState, useRef, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import ErrorMessage from '../components/ErrorMessage';
import { fetchWeatherByCity, fetchForecast } from '../api/weather';
import { useTheme } from '../context/ThemeContext';

const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes
const STORAGE_KEY = 'wd:recent';
const DEFAULT_CITY_KEY = 'wd:defaultCity';

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

  const load = useCallback(async (cityName) => {
    setError('');
    clearInterval(timerRef.current);

    try {
      const data = await fetchWeatherByCity(cityName, units);
      const { coord, name } = data;
      const forecast = await fetchForecast(coord.lat, coord.lon, units);

      setCity(name);
      setCurrent(data);
      setDaily(forecast);

      setRecent((r) =>
        [name, ...r.filter((x) => x.toLowerCase() !== name.toLowerCase())].slice(0, 6)
      );

      timerRef.current = setInterval(() => load(name), REFRESH_INTERVAL);
    } catch (err) {
      setError(err.message || 'City not found or network error.');
      setCurrent(null);
      setDaily(null);
    }
  }, [units]);

  useEffect(() => {
    if (city) {
      load(city);
    } else {
      const defaultCityName = localStorage.getItem(DEFAULT_CITY_KEY);
      if (defaultCityName) {
        load(defaultCityName);
      }
    }
  }, [units, load]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 6)));
  }, [recent]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

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

  const headerClasses = theme === 'dark'
    ? 'bg-gray-800 text-gray-200 border-gray-700'
    : 'bg-white text-gray-700 border-gray-100';

  const titleClasses = theme === 'dark' ? 'text-gray-100' : 'text-gray-700';

  const refreshButtonClasses = theme === 'dark'
    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <div className="flex flex-col gap-6">
      <header className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg shadow-sm border ${headerClasses}`}>
        <h2 className={`text-2xl font-bold ${titleClasses}`}>Live Weather Search</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'))}
            className="px-3 py-1 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
          >
            Units: {units === 'metric' ? '°C / km/h' : '°F / mph'}
          </button>

          <button
            onClick={handleRefresh}
            className={`px-3 py-1 rounded-full font-semibold text-sm transition ${refreshButtonClasses}`}
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
    </div>
  );
}
