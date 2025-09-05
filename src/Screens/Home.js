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
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido de vuelta</Text>
        {usuarioActual && <Text style={styles.userName}>{usuarioActual.nombre}</Text>}
      </View>

      <View style={styles.content}>
        {usuarioActual ? (
          <View style={styles.cardContainer}>
            <CardUsuarios
              id={usuarioActual.id}
              nombre={usuarioActual.nombre}
              correo={usuarioActual.correo}
              titulo={usuarioActual.titulo}
              anioGraduacion={usuarioActual.anioGraduacion}
            />
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.subtitle}>Cargando datos del usuario...</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#6366f1',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fbbf24',
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'center',
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#6366f1',
    letterSpacing: 0.3,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginHorizontal: 20,
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});