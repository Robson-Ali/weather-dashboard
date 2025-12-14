import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context object
const ThemeContext = createContext();

// 2. Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);

// 3. Provider Component
export const ThemeProvider = ({ children }) => {
  // Get theme preference from local storage or default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // Effect to save the theme preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};