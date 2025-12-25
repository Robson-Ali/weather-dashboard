import React, { useState } from 'react';

export default function SearchBar({ onSearch, recent = [], onSelectRecent }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
    setQ('');
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // You’ll need a function like fetchWeatherByCoords in your API
        // For now, just show an example:
        alert(`Got location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}\nIn a real app, this would fetch weather for your city.`);
      },
      (err) => {
        alert(`Location error: ${err.message}`);
      }
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search city (e.g. Nairobi)"
          className="flex-1 rounded-md p-2 border shadow-sm"
        />
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
          Search
        </button>
      </form>

      <div className="flex justify-between mt-2">
        <div className="flex flex-wrap gap-2">
          {recent?.length > 0 && (
            <>
              <span className="text-sm text-gray-500">Recent:</span>
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => onSelectRecent(r)}
                  className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                >
                  {r}
                </button>
              ))}
            </>
          )}
        </div>

        <button
          onClick={handleUseLocation}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Use my location
        </button>
      </div>
    </div>
  );
}
