export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;

  return (
    <div className="bg-white/20 p-6 rounded-xl mt-4 backdrop-blur-md shadow-lg">
      <h2 className="text-3xl font-semibold">{name}</h2>

      <div className="flex flex-col items-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="weather icon"
        />

        <p className="text-5xl font-bold">{Math.round(main.temp)}°C</p>
        <p className="text-xl capitalize">{weather[0].description}</p>

        <div className="mt-4 text-lg">
          <p>Humidity: {main.humidity}%</p>
          <p>Wind: {wind.speed} km/h</p>
        </div>
      </div>
    </div>
  );
}
