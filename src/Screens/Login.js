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
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
                style={styles.textInput}
                onFocus={() => setFocusedInput('contrasena')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={iniciarSesion}>
              <View style={styles.loginButtonGradient}>
                <Text style={styles.loginButtonText}>Ingresar</Text>
              </View>
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
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Gradiente de fondo
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 35,
    marginHorizontal: 5,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #6366f1)',
    backgroundClip: 'text',
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
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 2,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
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
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  loginButtonGradient: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
    backgroundColor: '#8b5cf6', // Fallback para React Native
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  registerButtonText: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    backgroundClip: 'text',
    color: '#8b5cf6', // Fallback
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: '#8b5cf6',
    letterSpacing: 0.5,
  },
  // Efectos adicionales para mejorar la experiencia visual
  glowEffect: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(135deg, #8b5cf6, #6366f1, #3b82f6)',
    borderRadius: 18,
    opacity: 0,
    zIndex: -1,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    borderRadius: 16,
  },
  // Elementos decorativos opcionales
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    background: 'radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6366f1 0%, transparent 50%)',
  },
  accentDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8b5cf6',
    position: 'absolute',
    top: 15,
    right: 15,
    opacity: 0.6,
  },
});
