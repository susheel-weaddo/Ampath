import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Spacing, Typography } from '../../theme';
import { DecorativeEllipses, Card } from '../../components';

export default function SearchScreen({ navigation }: any) {
  const showBack = typeof navigation?.canGoBack === 'function' ? navigation.canGoBack() : true;
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.top}>
        <View style={s.topRow}>
          {showBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="chevron-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ) : (
            <View style={s.backBtn} />
          )}
          <Text style={s.title}>Search</Text>
        </View>

        <View style={s.searchBox}>
          <TextInput
            placeholder="Search for “Full body checkup”"
            placeholderTextColor="#737373"
            style={s.searchInput}
          />
          <Ionicons name="search" size={20} color={Colors.primary} />
        </View>

        <View style={s.rxCard}>
          <Text style={s.rxTitle}>Have a{'\n'}Prescription?</Text>
          <TouchableOpacity activeOpacity={0.8} style={s.uploadBtn}>
            <View style={s.uploadIconWrap}>
              <Ionicons name="cloud-upload-outline" size={18} color={Colors.primary} />
            </View>
            <Text style={s.uploadLabel}>Upload</Text>
          </TouchableOpacity>
        </View>

        <Card style={s.quickCard} onPress={() => navigation.getParent()?.navigate('TestList')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ gap: 4 }}>
              <Text style={s.quickTitle}>Popular Tests</Text>
              <Text style={s.quickDesc}>Browse and add tests to cart</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.greyNormal} />
          </View>
        </Card>
      </View>

      <View style={s.noteWrap}>
        <Text style={s.note}>
          This screen is implemented from Figma (Search). Hook it up to results + prescription upload flow next.
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  top: { paddingTop: Platform.OS === 'ios' ? 56 : (RNStatusBar.currentHeight || 44) + 12, paddingHorizontal: 16, gap: 14 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  searchBox: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E9EFF6',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: { flex: 1, padding: 0, fontFamily: FontFamily.regular, fontSize: 10, color: Colors.greyText, marginRight: 10 },
  rxCard: {
    backgroundColor: '#E9EFF6',
    borderWidth: 1,
    borderColor: '#DEE7F1',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rxTitle: { fontFamily: FontFamily.semiBold, fontSize: 16, color: Colors.greyText, lineHeight: 19.2 },
  uploadBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primaryLightActive,
    borderRadius: 12,
    height: 50,
    width: 112,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadIconWrap: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: Colors.primaryLightActive, alignItems: 'center', justifyContent: 'center' },
  uploadLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primary },
  noteWrap: { flex: 1, justifyContent: 'flex-end', padding: 16, paddingBottom: 30 },
  note: { ...Typography.caption1, color: Colors.greyNormal, textAlign: 'center' },
  quickCard: { marginTop: 14 },
  quickTitle: { fontFamily: FontFamily.semiBold, fontSize: 14, color: Colors.greyText },
  quickDesc: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },
});
