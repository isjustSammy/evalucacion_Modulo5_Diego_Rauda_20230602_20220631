import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { database, auth } from '../config/Firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import CardUsuarios from '../components/CardUsuarios';

const Home = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(database, 'usuarios'), where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUsuarioActual({ id: doc.id, ...userData });
        });
      });

      return () => unsubscribe();
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sesión cerrada, el componente Navigation cambiará automáticamente la pantalla
        Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      })
      .catch((error) => {
        Alert.alert('Error', 'No se pudo cerrar sesión.');
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido de vuelta</Text>
      {usuarioActual && <Text style={styles.userName}>{usuarioActual.nombre}</Text>}

      {usuarioActual ? (
        <CardUsuarios
          id={usuarioActual.id}
          nombre={usuarioActual.nombre}
          correo={usuarioActual.correo}
          titulo={usuarioActual.titulo}
          anioGraduacion={usuarioActual.anioGraduacion}
        />
      ) : (
        <Text style={styles.subtitle}>Cargando datos del usuario...</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff9800',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ff9800',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});