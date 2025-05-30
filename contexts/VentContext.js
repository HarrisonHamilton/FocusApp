// contexts/VentContext.js
import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid';

export const VentContext = createContext();

export default function VentProvider({ children }) {
  const [vents, setVents] = useState([]);

  const addVent = (title) => {
    const newVent = { id: uuid.v4(), title };
    setVents((prev) => [...prev, newVent]);
  };

  const removeVent = (id) => {
    setVents((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <VentContext.Provider value={{ vents, addVent, removeVent }}>
      {children}
    </VentContext.Provider>
  );
}
