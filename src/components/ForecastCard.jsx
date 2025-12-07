import React from 'react'

export default function ForecastCard({ daily, units }) {
  if (!daily) return null
    const tempUnit = units === 'metric' ? '°C' : '°F'
      return (
        <div className="max-w-3xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {daily.slice(0, 7).map((d) => (
          <div key={d.dt} className="p-3 rounded bg-white/80 text-center">
            <div className="text-sm">{new Date(d.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</div>
            <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt={d.weather[0].description} />
            <div className="text-sm">{Math.round(d.temp.max)}{tempUnit} / {Math.round(d.temp.min)}{tempUnit}</div>
          </div>
        ))}
        </div>
      )
}
