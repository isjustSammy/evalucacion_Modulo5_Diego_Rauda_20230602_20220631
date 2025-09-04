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
      colors={['#667eea', '#764ba2', '#667eea']}
      style={styles.container}
      locations={[0, 0.5, 1]}
    >
      <StatusBar barStyle="light-content" />
     
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
        </Animated.View>
 
        {/* Spinner animado */}
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
 
        {/* Texto de carga */}
        <Text style={styles.loadingText}>Preparando evaluación...</Text>
 
        {/* Barra de progreso */}
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
          </View>
        </View>
 
        {/* Puntos de carga animados */}
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
          <Animated.View
            style={[
              styles.dot,
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
    backgroundColor: '#667eea',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 40,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#f0f0f0',
    textAlign: 'center',
    opacity: 0.9,
  },
  spinnerContainer: {
    marginBottom: 30,
  },
  spinner: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  spinnerDot1: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginLeft: -6,
  },
  spinnerDot2: {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: -5,
  },
  spinnerDot3: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 8,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginLeft: -4,
  },
  spinnerDot4: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: 10,
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: -5,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
    fontWeight: '300',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 25,
  },
  progressBackground: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});
 
export default LoadingScreen;