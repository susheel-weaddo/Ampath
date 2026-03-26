import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';
import ChevronRight from '../../assets/icons/icon-chevron-right.svg';

const ITEMS = [
  { key: 'guide', label: 'A guide to Ampath', onPress: (nav: any) => nav.navigate('GuideToAmpath') },
  { key: 'rx', label: 'Prescription Guide', onPress: () => {} },
  { key: 'placement', label: 'Order Placement', onPress: () => {} },
  { key: 'delivery', label: 'Order delivery', onPress: () => {} },
  { key: 'payments', label: 'Payments', onPress: () => {} },
  { key: 'policies', label: 'Policies', onPress: () => {} },
  { key: 'misc', label: 'Miscellaneous', onPress: () => {} },
];

export default function GetHelpScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Get Help" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {ITEMS.map((item) => (
          <View key={item.key} style={s.rowWrap}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => item.onPress(navigation)} style={s.row}>
              <Text style={s.rowText}>{item.label}</Text>
              <ChevronRight width={18} height={18} color={Colors.primary} preserveAspectRatio="xMidYMid meet" />
            </TouchableOpacity>
            <View style={s.hr} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 28, paddingHorizontal: 17, paddingBottom: 120 },
  rowWrap: { gap: 12, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowText: { fontFamily: FontFamily.regular, fontSize: 14, color: '#595959' },
  hr: { height: 1, backgroundColor: '#D4D4D8' },
});

