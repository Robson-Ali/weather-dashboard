import React from 'react';

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

function getUvColor(uvi) {
  if (uvi <= 2) return 'text-green-600';
  if (uvi <= 5) return 'text-yellow-600';
  if (uvi <= 7) return 'text-orange-600';
  if (uvi <= 10) return 'text-red-600';
  return 'text-purple-600';
}

export default function WeatherCard({ city, weather, units }) {
  if (!weather) return null;

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'km/h' : 'mph';

  const windSpeedMps = weather.wind_speed ?? weather.wind?.speed;
  const windSpeed = windSpeedMps
    ? units === 'metric'
      ? Math.round(windSpeedMps * 3.6)
      : Math.round(windSpeedMps * 2.237)
    : null;

  const uvColor = getUvColor(weather.uvi);

  return (
    <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur p-6 rounded-lg shadow mt-6">
      {/* City and time */}
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{city}</h2>
          <p className="text-sm text-gray-600">
            {new Date(weather.dt * 1000).toLocaleString()}
          </p>
        </div>

        {/* Temp + icon */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold">
              {Math.round(weather.temp)}
              {tempUnit}
            </div>
            <div className="text-sm text-gray-600">
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
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-gray-500">Humidity</div>
          <div className="font-medium">{weather.humidity}%</div>
        </div>

        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-gray-500">Wind</div>
          <div className="font-medium">
            {windSpeed !== null ? `${windSpeed} ${speedUnit}` : '—'}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-gray-500">Feels like</div>
          <div className="font-medium">
            {Math.round(weather.feels_like)}
            {tempUnit}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-gray-500">UV Index</div>
          <div className={`font-medium ${uvColor}`}>
            {weather.uvi ?? '—'}
          </div>
        </div>
      </div>

      {/* Sunrise / sunset */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-gray-500">Sunrise</div>
          <div className="font-medium">
            {new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-gray-500">Sunset</div>
          <div className="font-medium">
            {new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}
