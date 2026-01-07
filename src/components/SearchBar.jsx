import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ onSearch, recent = [], onSelectRecent }) {
  const { theme } = useTheme();
  const [q, setQ] = useState('');

  const inputClasses = `flex-1 rounded-md p-2 border shadow-sm ${theme === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-blue-50 text-blue-900 border-blue-200'}`;
  const mutedClass = theme === 'dark' ? 'text-sm text-gray-300' : 'text-sm text-blue-700';
  const recentButtonClasses = theme === 'dark' ? 'text-sm px-3 py-1 rounded bg-gray-700 text-gray-100 hover:bg-gray-600' : 'text-sm px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200';
  const locationButtonClasses = theme === 'dark' ? 'text-sm text-blue-400 hover:text-blue-200' : 'text-sm text-blue-600 hover:text-blue-800';

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
          className={inputClasses}
        />
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
          Search
        </button>
      </form>

      <div className="flex justify-between mt-2">
        <div className="flex flex-wrap gap-2">
          {recent?.length > 0 && (
            <>
              <span className={mutedClass}>Recent:</span>
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => onSelectRecent(r)}
                  className={recentButtonClasses}
                >
                  {r}
                </button>
              ))}
            </>
          )}
        </div>

        <button
          onClick={handleUseLocation}
          className={locationButtonClasses}
        >
          Use my location
        </button>
      </div>
    </div>
  );
}
