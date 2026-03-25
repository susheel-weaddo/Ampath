import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, Shadow } from '../../theme';
import { DecorativeEllipses, Button } from '../../components';

const FIGMA_REPORT_PREVIEW = require('../../assets/figma/8f926bc9-f0d3-4a7d-9470-43e305137aa8.png');

export default function ViewReportScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.greyText} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>View Report</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={{ padding: 16, paddingBottom: 120 }}>
        <View style={s.previewWrap}>
          <Image source={FIGMA_REPORT_PREVIEW} style={s.preview} resizeMode="contain" />
        </View>
      </View>

      <View style={s.bottomBar}>
        <Button title="Download Reports" onPress={() => { }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  previewWrap: { height: 461, borderRadius: 12, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, shadowOffset: { width: 0, height: 0 }, elevation: 2 },
  preview: { width: '100%' as any, height: '100%' as any },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, padding: 16, paddingBottom: 24, ...Shadow.lg },
});
