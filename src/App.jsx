import React, { useEffect, useState, useRef } from 'react'
const [city, setCity] = useState('')
const [units, setUnits] = useState('metric')
const [current, setCurrent] = useState(null)
const [daily, setDaily] = useState(null)
const [error, setError] = useState('')
const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
const timerRef = useRef(null)


useEffect(() => {
localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, 6)))
}, [recent])


useEffect(() => {
// cleanup on unmount
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


// update recent
setRecent((r) => [name, ...r.filter(x => x.toLowerCase() !== name.toLowerCase())].slice(0, 6))


// reset auto-refresh
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
<div className="min-h-screen bg-gradient-to-b from-sk
