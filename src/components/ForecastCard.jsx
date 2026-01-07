import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ForecastCard({ daily, units }) {
  if (!daily || !Array.isArray(daily)) return null;

  const { theme } = useTheme();
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'km/h' : 'mph';
  const containerClasses = `max-w-3xl mx-auto mt-4 ${theme === 'dark' ? 'bg-gray-800/60 divide-y divide-white/10' : 'bg-blue-50/60 divide-y divide-white/40'}`;
  const mutedClass = theme === 'dark' ? 'text-gray-300' : 'text-blue-700';

  return (
    <div>
      <ul className={containerClasses + " rounded"}>
        {daily.slice(0, 7).map((d) => (
          <li
            key={d.date}
            className="flex flex-col sm:flex-row items-center justify-between px-3 py-2 gap-2"
          >
            {/* Left: day + icon */}
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">
                {new Date(d.date).toLocaleDateString(undefined, {
                  weekday: 'short',
                })}
              </div>

              {d.weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${d.weather.icon}@2x.png`}
                  alt={d.weather.description}
                  className="h-8 w-8 sm:hidden md:block"
                />
              )}
            </div>

            {/* Middle: temps */}
            <div className="text-sm text-right">
              <div>
                {Number.isFinite(d.temp_max) ? `${Math.round(d.temp_max)}${tempUnit}` : '—'} / {Number.isFinite(d.temp_min) ? `${Math.round(d.temp_min)}${tempUnit}` : '—'}
              </div>
              {typeof d.pop !== 'undefined' && (
                <div className={`text-xs ${mutedClass}`}>
                  {Math.round(d.pop * 100)}% rain
                </div>
              )}
            </div>

            {/* Right: wind + humidity */}
            <div className={`text-xs ${mutedClass} text-right`}>
              <div>Wind: {typeof d.wind_speed === 'number' ? Math.round(d.wind_speed * (units === 'metric' ? 3.6 : 2.237)) + ` ${speedUnit}` : '—'}</div>
              <div>Humidity: {typeof d.humidity === 'number' ? `${d.humidity}%` : '—'}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
