import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';

import IconSun from '../../assets/icons/icon-sun.svg';
import IconMoon from '../../assets/icons/icon-moon.svg';
import IconDevice from '../../assets/icons/icon-device.svg';

type Mode = 'light' | 'dark' | 'system';

function ModeRow({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon: React.ComponentType<any>;
  selected: boolean;
  onPress: () => void;
}) {
  const Icon = icon;
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={[s.row, selected && s.rowSelected]}>
      <Icon width={20} height={20} color={selected ? Colors.primaryDark : '#666'} />
      <Text style={[s.rowText, selected && { color: Colors.primaryDark, fontFamily: FontFamily.medium }]}>{label}</Text>
      <View style={{ flex: 1 }} />
      {selected ? (
        <View style={s.tagSelected}>
          <Text style={s.tagSelectedText}>Selected</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default function AppearanceScreen({ navigation }: any) {
  const [mode, setMode] = useState<Mode>('light');
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Choose Appearance" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <ModeRow label="Light theme" icon={IconSun} selected={mode === 'light'} onPress={() => setMode('light')} />
        <ModeRow label="Dark theme" icon={IconMoon} selected={mode === 'dark'} onPress={() => setMode('dark')} />
        <ModeRow label="System default" icon={IconDevice} selected={mode === 'system'} onPress={() => setMode('system')} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 28, paddingHorizontal: 17, paddingBottom: 120, gap: 20 },
  row: { borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 17, backgroundColor: Colors.white },
  rowSelected: { borderColor: Colors.primaryDark },
  rowText: { fontFamily: FontFamily.regular, fontSize: 14, color: '#666' },
  tagSelected: { height: 24, borderRadius: 20, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D6E8F5' },
  tagSelectedText: { fontFamily: FontFamily.regular, fontSize: 10, color: '#296FA4' },
});

