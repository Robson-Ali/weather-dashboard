import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  // Determine if the background should be the gradient or plain white
  const isDashboard = window.location.pathname === '/';
  
  // Use NavLink for automatic active styling
  const linkClasses = ({ isActive }) => 
    `py-2 px-4 rounded-full transition duration-150 ease-in-out ${
      isActive 
        ? 'bg-blue-600 text-white font-bold shadow-md' 
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <div className={`min-h-screen ${isDashboard ? 'bg-gradient-to-b from-blue-100 to-white' : 'bg-gray-50'}`}>
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">
            <NavLink to="/">WeatherApp</NavLink>
          </div>
          
          <div className="flex space-x-4">
            <NavLink to="/" className={linkClasses} end>
              Dashboard
            </NavLink>
            <NavLink to="/weather" className={linkClasses}>
              Weather
            </NavLink>
            <NavLink to="/settings" className={linkClasses}>
              Settings
            </NavLink>
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
