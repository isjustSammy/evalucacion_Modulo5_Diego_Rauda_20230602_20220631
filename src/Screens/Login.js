import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const iniciarSesion = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      console.log('Usuario autenticado correctamente');
      // La navegación se hace automática por el listener en Navigation.js
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backgroundDecor}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />
        </View>
        
        <View style={styles.loginContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Bienvenido de nuevo, por favor ingresa</Text>
          </View>

          <View style={styles.formContainer}>
            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'correo' && styles.inputWrapperFocused,
              ]}
            >
              <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor="#94a3b8"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
                onFocus={() => setFocusedInput('correo')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                focusedInput === 'contrasena' && styles.inputWrapperFocused,
              ]}
            >
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#94a3b8"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
                style={styles.textInput}
                onFocus={() => setFocusedInput('contrasena')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={iniciarSesion}>
              <Text style={styles.loginButtonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
              <Text style={styles.registerButtonText}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    top: -50,
    right: -50,
  },
  circle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    bottom: 100,
    left: -30,
  },
  circle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    top: '40%',
    right: 20,
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 35,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6d28d9',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputWrapperFocused: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  textInput: {
    fontSize: 17,
    color: '#1e293b',
    paddingVertical: 18,
    paddingHorizontal: 4,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 35,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  registerButtonText: {
    textAlign: 'center',
    color: '#8b5cf6',
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
});