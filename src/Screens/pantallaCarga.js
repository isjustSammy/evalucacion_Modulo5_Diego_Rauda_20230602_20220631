import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 
const { width, height } = Dimensions.get('window');
 
const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
 
  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
 
    // Animación de rotación continua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
 
    // Animación de pulso
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
 
    // Barra de progreso
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);
 
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
 
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
 
  return (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6', '#6366f1', '#8b5cf6']}
      style={styles.container}
      locations={[0, 0.3, 0.7, 1]}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Elementos decorativos de fondo */}
      <View style={styles.backgroundDecor}>
        <View style={styles.floatingCircle1} />
        <View style={styles.floatingCircle2} />
        <View style={styles.floatingCircle3} />
      </View>
     
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Título */}
        <Animated.View style={[styles.titleContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.title}>Evaluación</Text>
          <Text style={styles.subtitle}>Módulo 5</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>
 
        {/* Spinner animado mejorado */}
        <View style={styles.spinnerWrapper}>
          <Animated.View
            style={[
              styles.spinnerContainer,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View style={styles.spinner}>
              <View style={styles.spinnerDot1} />
              <View style={styles.spinnerDot2} />
              <View style={styles.spinnerDot3} />
              <View style={styles.spinnerDot4} />
            </View>
          </Animated.View>
          <View style={styles.spinnerGlow} />
        </View>
 
        {/* Texto de carga */}
        <Text style={styles.loadingText}>Preparando evaluación...</Text>
 
        {/* Barra de progreso mejorada */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            />
            <View style={styles.progressShine} />
          </View>
          <Text style={styles.progressText}>Cargando recursos...</Text>
        </View>
 
        {/* Puntos de carga animados mejorados */}
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
          <Animated.View
            style={[
              styles.dotCenter,
              {
                opacity: fadeAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: 80,
    right: -20,
  },
  floatingCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: 120,
    left: -10,
  },
  floatingCircle3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: '30%',
    left: 30,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: 50,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#f1f5f9',
    textAlign: 'center',
    opacity: 0.95,
    letterSpacing: 2,
    marginBottom: 15,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: '#fbbf24',
    borderRadius: 2,
    marginTop: 8,
  },
  spinnerWrapper: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    zIndex: 2,
  },
  spinner: {
    width: 90,
    height: 90,
    position: 'relative',
  },
  spinnerGlow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  spinnerDot1: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 14,
    height: 14,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    marginLeft: -7,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  spinnerDot2: {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#fbbf24',
    borderRadius: 6,
    marginTop: -6,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  spinnerDot3: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 10,
    height: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
    marginLeft: -5,
    shadowColor: '#f1f5f9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  spinnerDot4: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: 12,
    height: 12,
    backgroundColor: '#fbbf24',
    borderRadius: 6,
    marginTop: -6,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingText: {
    fontSize: 19,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 35,
    opacity: 0.95,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fbbf24',
    borderRadius: 4,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  progressShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 2,
    borderRadius: 1,
  },
  progressText: {
    fontSize: 14,
    color: '#f1f5f9',
    opacity: 0.8,
    fontWeight: '400',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 6,
    opacity: 0.7,
  },
  dotCenter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fbbf24',
    marginHorizontal: 6,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});
 
export default LoadingScreen;