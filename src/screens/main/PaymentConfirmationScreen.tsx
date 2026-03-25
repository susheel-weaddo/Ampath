import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, Typography } from '../../theme';
import { DecorativeEllipses } from '../../components';

const FIGMA_RING = require('../../assets/figma/d8dbe2d8-4ec4-4ba5-8764-d942b3688c2a.png');

export default function PaymentConfirmationScreen({ navigation }: any) {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    const iv = setInterval(() => setSeconds((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (seconds === 0) navigation.replace('BookingSuccess');
  }, [seconds, navigation]);

  const mm = String(Math.floor(seconds / 60));
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.center}>
        <Image source={FIGMA_RING} style={{ width: 110, height: 110 }} resizeMode="contain" />
        <Text style={s.timer}>{mm}:{ss}</Text>
        <Text style={s.title}>Payment Confirmation</Text>
        <Text style={s.desc}>
          Lorem ipsum dolor sit amet consectetur. Arcu donec lorem eu augue quam vitae. Id bibendum pellentesque gravida.
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 39, gap: 14 },
  timer: { fontFamily: FontFamily.semiBold, fontSize: 28, color: Colors.primaryDark },
  title: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.primaryDark, textAlign: 'center', marginTop: 8 },
  desc: { ...Typography.body1, color: '#71717A', textAlign: 'center', lineHeight: 20 },
});
