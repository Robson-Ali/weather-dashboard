import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-12 flex flex-col items-center justify-center">
      <div className="text-center max-w-lg p-8 bg-white/90 backdrop-blur rounded-2xl shadow-xl">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to the Weather Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
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
