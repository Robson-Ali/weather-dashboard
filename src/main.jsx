import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; // Import the new Layout
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import SettingsPage from './pages/SettingsPage'; // Import the new Settings page

import './index.css';

function AppRouter() {
  return (
    <BrowserRouter>
      {/* The Layout component wraps ALL route content */}
      <Layout>
        <Routes>
          {/* 1. Dashboard Route */}
          <Route path="/" element={<DashboardPage />} />
          
          {/* 2. Weather Application Route */}
          <Route path="/weather" element={<WeatherPage />} />
          
          {/* 3. Settings Route */}
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Fallback Route */}
          <Route path="*" element={
              <div className="text-center p-20">
                  <h1 className="text-4xl text-red-500">404 - Page Not Found</h1>
                  <NavLink to="/" className="text-blue-500 mt-4 block">Go Home</NavLink>
              </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);