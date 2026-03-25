import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';

export default function SetReminderScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Set Reminder" onBack={() => navigation.goBack()} />
      <View style={s.body}>
        <Text style={s.note}>This screen is not in the provided Figma set yet. Hook up reminder preferences here.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  body: { padding: 16 },
  note: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.greyNormal },
});

