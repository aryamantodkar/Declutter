import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectedAppsContext = createContext();

export const SelectedAppsProvider = ({ children }) => {
  const [selectedApps, setSelectedApps] = useState([]);

  // Load from storage on app start
  useEffect(() => {
    const loadApps = async () => {
      const storedApps = await AsyncStorage.getItem('selectedApps');
      if (storedApps) {
        setSelectedApps(JSON.parse(storedApps));
      }
    };
    loadApps();
  }, []);

  // Save to storage whenever selectedApps changes
  useEffect(() => {
    AsyncStorage.setItem('selectedApps', JSON.stringify(selectedApps));
  }, [selectedApps]);

  return (
    <SelectedAppsContext.Provider value={{ selectedApps, setSelectedApps }}>
      {children}
    </SelectedAppsContext.Provider>
  );
};

export const useSelectedApps = () => useContext(SelectedAppsContext);
