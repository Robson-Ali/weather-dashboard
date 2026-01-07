import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUnits } from '../context/UnitsContext.jsx';

const DEFAULT_CITY_KEY = 'wd:defaultCity';

export default function SettingsPage() {
  const { theme } = useTheme();
  const { units, setUnits, toggleUnits } = useUnits();

  const [defaultCity, setDefaultCity] = useState(
    localStorage.getItem(DEFAULT_CITY_KEY) || ''
  );
  const [message, setMessage] = useState('');

  function handleSaveDefaultCity() {
    if (!defaultCity.trim()) {
      setMessage('Please enter a city name');
      return;
    }
    localStorage.setItem(DEFAULT_CITY_KEY, defaultCity.trim());
    setMessage(`Saved default city: ${defaultCity.trim()}`);
    setTimeout(() => setMessage(''), 3000);
  }

  function handleClearDefaultCity() {
    localStorage.removeItem(DEFAULT_CITY_KEY);
    setDefaultCity('');
    setMessage('Default city cleared');
    setTimeout(() => setMessage(''), 3000);
  }

  function handleUnitChange(u) {
    setUnits(u);
    setMessage(`Units set to ${u}`);
    setTimeout(() => setMessage(''), 2000);
  }

  // Conditional classes for the card background
  const cardClasses = theme === 'dark' ? 'bg-gray-800 text-gray-200 shadow-xl' : 'bg-blue-50 text-blue-900 shadow';
  const inputClasses = theme === 'dark' ? 'flex-grow p-2 border rounded-lg bg-gray-700 border-gray-600 text-white' : 'flex-grow p-2 border rounded-lg bg-blue-50 border-blue-200 text-blue-900';
  const btnPrimary = 'px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700';
  const btnSecondary = 'px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300';

  return (
    <div className="p-8">
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-blue-900'}`}>Settings & Preferences</h1>

      <div className={`p-6 rounded-lg space-y-6 ${cardClasses}`}> 

        {/* Default City Setting Feature */}
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
            Set Default City
          </h3>
          <p className={theme === 'dark' ? 'text-gray-300 mb-3' : 'text-blue-700 mb-3'}>
            Enter a city name to load its weather automatically when the app starts.
          </p>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={defaultCity}
              onChange={(e) => setDefaultCity(e.target.value)}
              placeholder="e.g. London"
              className={inputClasses}
            />

            <div className="flex items-center gap-2">
              <button onClick={handleSaveDefaultCity} className={btnPrimary}>Set Default</button>
              <button onClick={handleClearDefaultCity} className={btnPrimary}>Clear</button>
            </div>
          </div>

          {message && <div className={`mt-3 ${theme === 'dark' ? 'text-gray-200' : 'text-blue-800'}`}>{message}</div>}
        </div>

        {/* Unit Setting now controlled here */}
        <div className={`pt-4 ${theme === 'dark' ? 'border-t border-gray-700' : 'border-t'}`}>
          <h3 className="text-xl font-semibold mb-2">Unit Setting</h3>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600 mb-3'}>
            Choose your preferred measurement units for temperature and wind speed.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUnitChange('metric')}
              className={`px-3 py-2 rounded ${units === 'metric' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              Metric (°C / km/h)
            </button>

            <button
              onClick={() => handleUnitChange('imperial')}
              className={`px-3 py-2 rounded ${units === 'imperial' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              Imperial (°F / mph)
            </button>

            <div className={`ml-4 ${theme === 'dark' ? 'text-gray-300' : 'text-blue-700'}`}>Current: <strong>{units}</strong></div>
          </div>
        </div>

      </div>
    </div>
  );
}