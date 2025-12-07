const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE = 'https://api.openweathermap.org/data/2.5'


export async function fetchWeatherByCity(city, units = 'metric') {
// 1) Get coordinates from current weather endpoint
const q = encodeURIComponent(city)
const url = `${BASE}/weather?q=${q}&appid=${API_KEY}&units=${units}`
const res = await fetch(url)
if (!res.ok) throw new Error('City not found')
const data = await res.json()
return data // contains coord {lat, lon} and current weather
}


export async function fetchOneCall(lat, lon, units = 'metric', exclude = 'minutely,hourly,alerts') {
const url = `${BASE}/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=${exclude}&appid=${API_KEY}`
const res = await fetch(url)
if (!res.ok) throw new Error('Failed to fetch forecast')
return res.json()
}
