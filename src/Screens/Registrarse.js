import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { auth, database } from '../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const RegistroUsuarios = ({ navigation }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    titulo: '',
    anioGraduacion: '',
  });

  const registrarUsuario = async () => {
    const { nombre, correo, contrasena, titulo, anioGraduacion } = usuario;

    if (!nombre || !correo || !contrasena || !titulo || !anioGraduacion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const uid = userCredential.user.uid;

      // Guardar información adicional en Firestore
      await addDoc(collection(database, 'usuarios'), {
        uid,
        nombre,
        correo,
        titulo,
        anioGraduacion: parseInt(anioGraduacion),
        creado: new Date(),
        activo: true,
      });

      Alert.alert('Registro exitoso', 'Usuario creado correctamente');

      // No navegamos manualmente porque el listener de auth cambia el stack automáticamente

    } catch (error) {
      console.error('Error al registrar usuario', error);
      Alert.alert('Error', 'No se pudo registrar. Tal vez el correo ya está en uso.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre completo:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
          value={usuario.nombre}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setUsuario({ ...usuario, correo: text })}
          value={usuario.correo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setUsuario({ ...usuario, contrasena: text })}
          value={usuario.contrasena}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título universitario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsuario({ ...usuario, titulo: text })}
          value={usuario.titulo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Año de graduación:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setUsuario({ ...usuario, anioGraduacion: text })}
          value={usuario.anioGraduacion}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
        <Text style={styles.buttonText}>Registrar usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistroUsuarios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a78bfa',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: '#8b5cf6',
    backgroundColor: '#1e293b',
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#374151',
    shadowOpacity: 0,
    elevation: 0,
  },
  cancelButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});