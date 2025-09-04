import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { database, auth } from '../config/Firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import CardUsuarios from '../components/CardUsuarios';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const q = query(collection(database, 'usuarios'), orderBy('creado', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setUsuarios(docs);
    });

    return () => unsubscribe();
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

  const renderItem = ({ item }) => (
    <CardUsuarios
      id={item.id}
      nombre={item.nombre}
      correo={item.correo}
      titulo={item.titulo}
      anioGraduacion={item.anioGraduacion}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>

      {usuarios.length !== 0 ? (
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.subtitle}>No hay usuarios registrados</Text>
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ff9800',
  },
  list: {
    flexGrow: 1,
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
