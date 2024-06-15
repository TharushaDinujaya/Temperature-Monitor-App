import { useState, useEffect, createContext } from 'react';

const WeatherData = createContext();
export const WeatherDataProvider = ({ children, data }) => {
  return (
    <WeatherData.Provider value={data}>
      {children}
    </WeatherData.Provider>
  );
};

export const useWeatherData = () => {
  return useContext(DataContext);
};