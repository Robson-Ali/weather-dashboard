import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function DashboardPage() {
  const { theme } = useTheme();

  const outerClass = "min-h-screen p-12 flex flex-col items-center justify-center";
  const cardClass = theme === 'dark'
    ? 'text-center max-w-lg p-8 bg-gray-800/90 backdrop-blur rounded-2xl shadow-xl text-gray-100'
    : 'text-center max-w-lg p-8 bg-blue-50/90 backdrop-blur rounded-2xl shadow-xl text-blue-900';
  const titleClass = `text-5xl font-extrabold mb-4 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-900'}`;
  const paragraphClass = theme === 'dark' ? 'text-gray-300 mb-8' : 'text-blue-800 mb-8';

  return (
    <div className={outerClass}>
      <div className={cardClass}>
        <h1 className={titleClass}>
          Welcome to the Weather Dashboard
        </h1>
        <p className={paragraphClass}>
          Your portal for real-time weather, forecasts, and recent city searches.
        </p>
        <Link 
          to="/weather" 
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-full text-xl hover:bg-green-600 transition shadow-lg"
        >
          Check the Weather Now →
        </Link>
      </div>
    </div>
  );
}
