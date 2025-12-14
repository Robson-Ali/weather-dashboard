import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // 🛑 NEW IMPORT

const DEFAULT_CITY_KEY = 'wd:defaultCity';

export default function SettingsPage() {
  const { theme } = useTheme(); // 🛑 Use theme context
  const [defaultCity, setDefaultCity] = useState(
    localStorage.getItem(DEFAULT_CITY_KEY) || ''
  );
  const [message, setMessage] = useState('');
  
  // ... handleSave function (unchanged) ...
  
  // Conditional classes for the card background
  const cardClasses = theme === 'dark' ? 'bg-gray-800 text-gray-200 shadow-xl' : 'bg-white text-gray-800 shadow';

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings & Preferences</h1>
      
      {/* 🛑 Apply theme class to the card */}
      <div className={`p-6 rounded-lg space-y-6 ${cardClasses}`}> 
        
        {/* Default City Setting Feature */}
        <div>
          {/* Use conditional text color */}
          <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
            Set Default City
          </h3>
          <p className="text-gray-600 mb-3">
            Enter a city name to load its weather automatically when the app starts.
          </p>
          
          {/* Input styling */}
          <div className="flex gap-3">
            <input
              type="text"
              // ... rest of input props ...
              className={`flex-grow p-2 border rounded-lg ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}
            />
            {/* ... button (unchanged) ... */}
          </div>
          
          {/* ... message (unchanged) ... */}
        </div>
        
        {/* Existing Unit Setting Placeholder (with border color adjusted for dark mode) */}
        <div className={`pt-4 ${theme === 'dark' ? 'border-t border-gray-700' : 'border-t'}`}>
          <h3 className="text-xl font-semibold mb-2">Unit Setting</h3>
          <p className="text-gray-600">
            Note: Unit toggling is currently controlled on the Weather Dashboard page.
          </p>
        </div>
        
      </div>
    </div>
  );
}