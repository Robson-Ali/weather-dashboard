import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // 🛑 NEW IMPORT

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme(); // 🛑 USE CONTEXT
  
  // Use 'dark' class for Tailwind CSS dark mode utilities
  const themeClass = theme === 'dark' ? 'dark' : ''; 

  // Determine if the background should be the gradient or plain color
  const isDashboard = window.location.pathname === '/';
  
  // Base classes for the main div
  const baseClasses = `min-h-screen ${themeClass}`;

  // Conditional background based on page and theme
  const backgroundClasses = 
    isDashboard && theme === 'light'
      ? 'bg-gradient-to-b from-blue-100 to-white'
      : theme === 'dark'
      ? 'bg-gray-900 text-gray-100' // Dark mode background
      : 'bg-gray-50'; // Light mode background for sub-pages

  const linkClasses = ({ isActive }) => 
    `py-2 px-4 rounded-full transition duration-150 ease-in-out ${
      isActive 
        ? 'bg-blue-600 text-white font-bold shadow-md' 
        : theme === 'dark' 
        ? 'text-gray-300 hover:bg-gray-700' // Dark mode nav text
        : 'text-gray-700 hover:bg-gray-200' // Light mode nav text
    }`;

  return (
    // 🛑 Apply classes to the outermost div
    <div className={`${baseClasses} ${backgroundClasses}`}>
      
      {/* Navigation Bar */}
      <nav className={`shadow-md p-4 sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
            <NavLink to="/">WeatherApp</NavLink>
          </div>
          
          <div className="flex space-x-4 items-center">
            {/* Nav Links */}
            <NavLink to="/" className={linkClasses} end>Dashboard</NavLink>
            <NavLink to="/weather" className={linkClasses}>Weather</NavLink>
            <NavLink to="/settings" className={linkClasses}>Settings</NavLink>

            {/* 🛑 THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full text-sm font-semibold transition ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-300' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content Area */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}