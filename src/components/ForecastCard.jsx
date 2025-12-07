import React from 'react';

export default function ForecastCard({ daily, units }) {
  if (!daily || !Array.isArray(daily)) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="max-w-3xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
      {daily.slice(0, 7).map((d) => (
        <div key={d.date} className="p-3 rounded bg-white/80 text-center">
          
          {/* Date */}
          <div className="text-sm">
            {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}
          </div>

          {/* Weather icon */}
          {d.weather && (
            <img
              src={`https://openweathermap.org/img/wn/${d.weather.icon}@2x.png`}
              alt={d.weather.description}
              className="mx-auto"
            />
          )}

          {/* Temps */}
          <div className="text-sm">
            {Math.round(d.temp_max)}
            {tempUnit} / {Math.round(d.temp_min)}
            {tempUnit}
          </div>
        </div>
      ))}
    </div>
  );
}
