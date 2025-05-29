import React, { createContext, useState } from 'react';

export const VentContext = createContext();

export default function VentProvider({ children }) {
  const [vents, setVents] = useState([]);

  const addVent = (title) => {
    setVents((prev) => [...prev, title]);
  };

  const removeVent = (title) => {
    setVents((prev) => prev.filter((v) => v !== title));
  };

  return (
    <VentContext.Provider value={{ vents, addVent, removeVent }}>
      {children}
    </VentContext.Provider>
  );
}
