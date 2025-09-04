import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import LoadingScreen from './src/Screens/pantallaCarga'; // Ajusta la ruta si es necesario
import Navigation from './src/navigation/navigation';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga, por ejemplo 3 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpia el timer si desmonta
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Navigation />;
}
