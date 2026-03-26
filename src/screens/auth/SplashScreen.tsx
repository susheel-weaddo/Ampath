import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../theme';
import { DecorativeEllipses, LogoBlock } from '../../components';

const FIGMA_SPLASH_LOGO = require('../../assets/figma/e6039365-2a45-468f-8c8f-150c5c2e0169.png');

export default function SplashScreen({ navigation }: any) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(() => navigation.replace('Onboarding'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Image
          source={FIGMA_SPLASH_LOGO}
          style={s.logo}
          resizeMode="contain"
          accessibilityLabel="AMPATH"
        />
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  logo: { width: 223, height: 50.44 },
});
