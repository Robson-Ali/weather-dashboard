import React from 'react';
import ReactDOM from 'react-dom/client';
// NavLink is correctly imported here
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'; 

import Layout from './pages/Layout.jsx';
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import SettingsPage from './pages/SettingsPage';
import { ThemeProvider } from './context/ThemeContext.jsx'; 

import './index.css';

function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* ✅ FIX: Replace the comment with valid JSX element */}
            <Route 
              path="*" 
              element={
                <div className="text-center p-10 mt-10 bg-white shadow-lg rounded-lg">
                  <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 mb-6">The page you requested does not exist.</p>
                  <NavLink to="/" className="text-blue-500 hover:text-blue-700 font-semibold text-lg">
                    Go to Dashboard
                  </NavLink>
                </div>
              } 
            />
            {/* End of corrected 404 Route */}
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);