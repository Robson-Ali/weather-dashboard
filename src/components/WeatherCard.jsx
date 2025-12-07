import React from 'react'


function WeatherIcon({ icon, desc }) {
const src = `https://openweathermap.org/img/wn/${icon}@2x.png`
return <img src={src} alt={desc} width={80} height={80} />
}


export default function WeatherCard({ city, weather, units }) {
if (!weather) return null
const tempUnit = units === 'metric' ? '°C' : '°F'
const speedUnit = units === 'metric' ? 'km/h' : 'mph'
const windSpeed = units === 'metric' ? (weather.wind_speed ?? weather.wind?.speed) : (weather.wind_speed ?? weather.wind?.speed)


return (
<div className="max-w-3xl mx-auto bg-white/70 backdrop-blur p-6 rounded-lg shadow mt-6">
<div className="flex items-center gap-6">
<div>
<h2 className="text-2xl font-semibold">{city}</h2>
<p className="text-sm text-gray-600">{new Date(weather.dt * 1000).toLocaleString()}</p>
</div>


<div className="flex-1 flex items-center justify-end gap-6">
<div className="text-center">
<div className="text-4xl font-bold">{Math.round(weather.temp)}{tempUnit}</div>
<div className="text-sm text-gray-600">{weather.weather?.[0]?.description}</div>
</div>


<WeatherIcon icon={weather.weather?.[0]?.icon} desc={weather.weather?.[0]?.description} />
</div>
</div>


<div className="mt-4 grid grid-cols-3 gap-4 text-sm">
<div className="p-3 bg-gray-50 rounded">
<div className="text-xs text-gray-500">Humidity</div>
<div className="font-medium">{weather.humidity}%</div>
</div>
<div className="p-3 bg-gray-50 rounded">
<div className="text-xs text-gray-500">Wind</div>
<div className="font-medium">{Math.round((weather.wind_speed ?? weather.wind?.speed) * (units==='metric'?3.6:1))} {speedUnit}</div>
</div>
<div className="p-3 bg-gray-50 rounded">
<div className="text-xs text-gray-500">Feels like</div>
<div className="font-medium">{Math.round(weather.feels_like)}{tempUnit}</div>
</div>
</div>
</div>
)
}
