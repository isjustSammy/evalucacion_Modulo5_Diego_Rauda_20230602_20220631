import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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

  const [focusedInput, setFocusedInput] = useState(null);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Elementos decorativos de fondo */}
          <View style={styles.backgroundDecor}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
          </View>

          <View style={styles.formCard}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>Únete a nuestra comunidad universitaria</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre completo</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'nombre' && styles.inputFocused
                  ]}
                  placeholder="Ingresa tu nombre completo"
                  placeholderTextColor="#6b7280"
                  onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
                  value={usuario.nombre}
                  onFocus={() => setFocusedInput('nombre')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'correo' && styles.inputFocused
                  ]}
                  placeholder="ejemplo@universidad.edu"
                  placeholderTextColor="#6b7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => setUsuario({ ...usuario, correo: text })}
                  value={usuario.correo}
                  onFocus={() => setFocusedInput('correo')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'contrasena' && styles.inputFocused
                  ]}
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor="#6b7280"
                  secureTextEntry
                  onChangeText={(text) => setUsuario({ ...usuario, contrasena: text })}
                  value={usuario.contrasena}
                  onFocus={() => setFocusedInput('contrasena')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Título universitario</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'titulo' && styles.inputFocused
                  ]}
                  placeholder="Ej: Licenciatura en Ingeniería"
                  placeholderTextColor="#6b7280"
                  onChangeText={(text) => setUsuario({ ...usuario, titulo: text })}
                  value={usuario.titulo}
                  onFocus={() => setFocusedInput('titulo')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Año de graduación</Text>
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'anioGraduacion' && styles.inputFocused
                  ]}
                  placeholder="2024"
                  placeholderTextColor="#6b7280"
                  keyboardType="numeric"
                  onChangeText={(text) => setUsuario({ ...usuario, anioGraduacion: text })}
                  value={usuario.anioGraduacion}
                  onFocus={() => setFocusedInput('anioGraduacion')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
                <Text style={styles.buttonText}>Crear mi cuenta</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.cancelButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistroUsuarios;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    top: 50,
    right: -30,
  },
  circle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    bottom: 100,
    left: -20,
  },
  circle3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    top: '30%',
    right: 40,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.9,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(148, 163, 184, 0.3)',
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputFocused: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  button: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  cancelButtonText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});