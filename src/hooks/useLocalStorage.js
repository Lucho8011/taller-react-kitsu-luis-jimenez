import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Inicialización perezosa: lee de localStorage solo la primera vez
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error al leer localStorage", error);
      return initialValue;
    }
  });

  // Efecto secundario: escribe en localStorage cada vez que storedValue cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error al guardar en localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};