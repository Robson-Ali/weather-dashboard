import React, { createContext, useContext, useState, useEffect } from 'react';

const UnitsContext = createContext();
export const useUnits = () => useContext(UnitsContext);

const STORAGE_KEY = 'wd:units';

export const UnitsProvider = ({ children }) => {
  const [units, setUnits] = useState(() => localStorage.getItem(STORAGE_KEY) || 'metric');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, units);
  }, [units]);

  const toggleUnits = () => setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'));

  return (
    <UnitsContext.Provider value={{ units, setUnits, toggleUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};
