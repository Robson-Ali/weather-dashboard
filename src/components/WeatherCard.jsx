import React from 'react';
import { useTheme } from '../context/ThemeContext';

function WeatherIcon({ icon, desc }) {
  const src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <img
      src={src}
      alt={desc}
      width={80}
      height={80}
      className="sm:hidden md:block"
    />
  );
}


export default function WeatherCard({ city, weather, units }) {
  if (!weather) return null;

  const mainTemp = weather.main?.temp ?? weather.temp;
  const feelsLike = weather.main?.feels_like ?? weather.feels_like;
  const humidity = weather.main?.humidity ?? weather.humidity;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'km/h' : 'mph';

  const windSpeedMps = weather.wind_speed ?? weather.wind?.speed;
  const windSpeed = windSpeedMps
    ? units === 'metric'
      ? Math.round(windSpeedMps * 3.6)
      : Math.round(windSpeedMps * 2.237)
    : null;

  const sunrise = weather.sys?.sunrise ?? weather.sunrise;
  const sunset = weather.sys?.sunset ?? weather.sunset;
  const dt = weather.dt ?? null;

  const { theme } = useTheme();
  const containerClasses = `max-w-3xl mx-auto p-6 rounded-lg shadow mt-6 backdrop-blur ${theme === 'dark' ? 'bg-gray-800/60 text-gray-100' : 'bg-blue-50/70 text-blue-900'}`;
  const mutedClass = theme === 'dark' ? 'text-gray-300' : 'text-blue-700';
  const labelClass = theme === 'dark' ? 'text-xs text-gray-400' : 'text-xs text-blue-600';
  const statCardClasses = `p-3 rounded text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`;

  return (
    <div className={containerClasses}>
      {/* City and time */}
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{city}</h2>
          <p className={`text-sm ${mutedClass}`}>
            {dt ? new Date(dt * 1000).toLocaleString() : '—'}
          </p>
        </div>

        {/* Temp + icon */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold">
              {mainTemp != null ? `${Math.round(mainTemp)}${tempUnit}` : '—'}
            </div>
            <div className={`text-sm ${mutedClass}`}>
              {weather.weather?.[0]?.description}
            </div>
          </div>

          <WeatherIcon
            icon={weather.weather?.[0]?.icon}
            desc={weather.weather?.[0]?.description}
          />
        </div>
      </div>

      {/* Main stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className={statCardClasses}>
          <div className={labelClass}>Humidity</div>
          <div className="font-medium">{humidity != null ? `${humidity}%` : '—'}</div>
        </div>

        <div className={statCardClasses}>
          <div className={labelClass}>Wind</div>
          <div className="font-medium">
            {windSpeed !== null ? `${windSpeed} ${speedUnit}` : '—'}
          </div>
        </div>

        <div className={statCardClasses}>
          <div className={labelClass}>Feels like</div>
          <div className="font-medium">
            {feelsLike != null ? `${Math.round(feelsLike)}${tempUnit}` : '—'}
          </div>
        </div>

      </div>

      {/* Sunrise / sunset */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className={statCardClasses}>
          <div className={labelClass}>Sunrise</div>
          <div className="font-medium">
            {sunrise ? new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
          </div>
        </div>

        <div className={statCardClasses}>
          <div className={labelClass}>Sunset</div>
          <div className="font-medium">
            {sunset ? new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
