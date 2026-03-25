import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';

export default function AccountSecurityScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Account and Security" onBack={() => navigation.goBack()} />
      <View style={s.body}>
        <Text style={s.note}>Placeholder screen. Add password / OTP / delete account flows here.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  body: { padding: 16 },
  note: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyNormal },
});

