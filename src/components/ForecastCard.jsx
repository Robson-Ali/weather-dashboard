import React from 'react';

export default function ForecastCard({ daily, units }) {
  if (!daily || !Array.isArray(daily)) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'km/h' : 'mph';

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <ul className="divide-y divide-white/40 bg-white/60 rounded">
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
                {Math.round(d.temp_max)}
                {tempUnit} / {Math.round(d.temp_min)}
                {tempUnit}
              </div>
              {typeof d.pop !== 'undefined' && (
                <div className="text-xs text-gray-600">
                  {Math.round(d.pop * 100)}% rain
                </div>
              )}
            </div>

            {/* Right: wind + humidity */}
            <div className="text-xs text-gray-600 text-right">
              <div>Wind: {Math.round(d.wind_speed * (units === 'metric' ? 3.6 : 2.237))} {speedUnit}</div>
              <div>Humidity: {d.humidity}%</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
