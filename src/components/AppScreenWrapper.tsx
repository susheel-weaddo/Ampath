import React from 'react';
import type { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const VectorAImage = require('../assets/figma/vector-a.png');

export default function AppScreenWrapper({ children }: { children: ReactNode }) {
  return (
    <View style={s.container}>
      <Image
        source={VectorAImage}
        style={s.bg}
        resizeMode="contain"
      />
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 15,
    left: 0,
    width: "52%",
    aspectRatio: 247/374,
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
});
