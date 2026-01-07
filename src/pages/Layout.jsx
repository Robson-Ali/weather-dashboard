import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // 🛑 NEW IMPORT

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme(); // 🛑 USE CONTEXT
  
  // Use 'dark' class for Tailwind CSS dark mode utilities
  const themeClass = theme === 'dark' ? 'dark' : ''; 

  // Base classes for the main div (make it a column flex so footer can sit at bottom)
  const baseClasses = `min-h-screen flex flex-col ${themeClass}`;

  // For light mode use a lighter blue gradient across all pages; dark mode keeps the gray background
  const backgroundClasses = theme === 'dark'
    ? 'bg-gray-900 text-gray-100'
    : 'bg-gradient-to-b from-blue-100 to-blue-50';

  const linkClasses = ({ isActive }) => 
    `py-2 px-4 rounded-full transition duration-150 ease-in-out ${
      isActive 
        ? 'bg-blue-600 text-white font-bold shadow-md' 
        : theme === 'dark' 
        ? 'text-gray-300 hover:bg-gray-700' // Dark mode nav text
        : 'text-blue-700 hover:bg-blue-200' // Light mode nav text
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
      <main className="flex-1 max-w-6xl mx-auto p-4 sm:p-6">
        {children}
      </main>

      {/* Footer (stick to bottom when content is short) */}
      <footer className={`w-full mt-auto py-4 text-center text-sm border-t ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-blue-100 text-blue-700'}`} aria-label="Site footer">
        WeatherApp © 2026
      </footer>
    </div>
  );
}