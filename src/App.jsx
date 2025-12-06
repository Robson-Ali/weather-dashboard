import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const API_KEY = "YOUR_API_KEY_HERE";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName = city) => {
    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchWeather(city), 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 text-white p-6">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Weather Dashboard</h1>

        <SearchBar onSearch={fetchWeather} />

        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

export default App;
