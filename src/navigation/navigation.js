import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../config/Firebase'; 

import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Registrarse from '../Screens/Registrarse';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} options={{ title: 'Iniciar Sesión' }} />
    <AuthStack.Screen name="Registrarse" component={Registrarse} options={{ title: 'Crear Cuenta' }} />
  </AuthStack.Navigator>
);

const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
  </AppStack.Navigator>
);

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; 

  return (
    <NavigationContainer>
      {user ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
