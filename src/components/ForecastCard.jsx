import React from 'react';

export default function ForecastCard({ daily, units }) {
  if (!daily || !Array.isArray(daily)) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <ul className="divide-y divide-white/40 bg-white/60 rounded">
        {daily.slice(0, 7).map((d) => (
          <li
            key={d.date}
            className="flex items-center justify-between px-3 py-2"
          >
            {/* Left: day + icon */}
            <div className="flex items-center gap-3">
              {/* Date */}
              <div className="text-sm font-medium">
                {new Date(d.date).toLocaleDateString(undefined, {
                  weekday: 'short',
                })}
              </div>

              {/* Weather icon */}
              {d.weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${d.weather.icon}@2x.png`}
                  alt={d.weather.description}
                  className="h-10 w-10"
                />
              )}
            </div>

            {/* Right: temps */}
            <div className="text-sm">
              {Math.round(d.temp_max)}
              {tempUnit} / {Math.round(d.temp_min)}
              {tempUnit}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}