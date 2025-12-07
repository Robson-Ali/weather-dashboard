import React, { useEffect, useState, useRef } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import ErrorMessage from './components/ErrorMessage'
import { fetchWeatherByCity, fetchOneCall } from './api/weather'

const REFRESH_INTERVAL = 1000 * 60 * 5 // 5 minutes
const STORAGE_KEY = 'wd:recent'

export default function App() {
  const [city, setCity] = useState('')
  const [units, setUnits] = useState('metric')
  const [current, setCurrent] = useState(null)
  const [daily, setDaily] = useState(null)
  const [error, setError] = useState('')
  const [recent, setRecent] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  )

  const timerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 6)))
  }, [recent])

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  async function load(cityName) {
    setError('')
    try {
      const data = await fetchWeatherByCity(cityName, units)
      const { coord, name } = data
      const one = await fetchOneCall(coord.lat, coord.lon, units)

      setCity(name)
      setCurrent(one.current)
      setDaily(one.daily)

      setRecent((r) =>
        [name, ...r.filter((x) => x.toLowerCase() !== name.toLowerCase())].slice(0, 6)
      )

      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => load(name), REFRESH_INTERVAL)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  function handleSearch(q) {
    load(q)
  }

  function handleSelectRecent(r) {
    load(r)
  }

  function handleRefresh() {
    if (!city) return
    load(city)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Weather Dashboard</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'))}
              className="px-3 py-1 rounded bg-gray-100"
            >
              Units: {units}
            </button>

            <button onClick={handleRefresh} className="px-3 py-1 rounded bg-gray-100">
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

        <footer className="text-center text-sm text-gray-500 mt-8">
          Data from OpenWeatherMap
        </footer>
      </div>
    </div>
  )
}
