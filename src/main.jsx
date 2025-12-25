import React from 'react';
import ReactDOM from 'react-dom/client';

// Routing
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

// Layout and pages
import Layout from './pages/Layout.jsx';
import DashboardPage from './pages/DashboardPage';
import WeatherPage from './pages/WeatherPage';
import SettingsPage from './pages/SettingsPage';

// Theme context
import { ThemeProvider } from './context/ThemeContext.jsx';

// Styles
import './index.css';

function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* 404 - Catch-all route */}
            <Route
              path="*"
              element={
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6">
                  <div className="text-center max-w-lg p-8 bg-white/90 backdrop-blur rounded-2xl shadow-xl">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-6">
                      The page you requested does not exist.
                    </p>
                    <NavLink
                      to="/"
                      className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
                    >
                      Go to Dashboard
                    </NavLink>
                  </div>
                </div>
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
