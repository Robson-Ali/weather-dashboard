const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

// Get current weather + coordinates
export async function fetchWeatherByCity(city, units = "metric") {
  const q = encodeURIComponent(city);
  const url = `${BASE}/weather?q=${q}&units=${units}&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");

  return res.json();
}

// 5-day / 3-hour forecast → daily summary
export async function fetchForecast(lat, lon, units = "metric") {
  const url = `${BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch forecast");

  const data = await res.json();

  const dailyMap = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        temp_min: item.main.temp,
        temp_max: item.main.temp,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        pop: item.pop,
        weather: item.weather[0],
      };
    } else {
      dailyMap[date].temp_min = Math.min(dailyMap[date].temp_min, item.main.temp);
      dailyMap[date].temp_max = Math.max(dailyMap[date].temp_max, item.main.temp);
      dailyMap[date].humidity = Math.round(
        (dailyMap[date].humidity + item.main.humidity) / 2
      );
      dailyMap[date].wind_speed = Math.max(dailyMap[date].wind_speed, item.wind.speed);
      dailyMap[date].pop = Math.max(dailyMap[date].pop, item.pop);
    }
  });

  return Object.values(dailyMap).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}
