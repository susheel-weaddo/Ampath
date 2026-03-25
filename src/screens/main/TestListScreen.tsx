import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Shadow, Typography } from '../../theme';
import { DecorativeEllipses, Button } from '../../components';

const FIGMA_TEST_ICON = require('../../assets/figma/aa346e5d-6a6a-4514-8405-45cf599d2684.png');

const FILTERS = ['Sort', 'All Filter', 'Packages', 'Tests'];

const DATA = [
  { id: '1', name: 'CBC (Complete Blood Count)', tests: 21, price: 319, mrp: 350 },
  { id: '2', name: 'Serum Prolactin', tests: 21, price: 319, mrp: 350 },
  { id: '3', name: 'PSA (Prostrate Specific Antigen) Total', tests: 21, price: 319, mrp: 350 },
  { id: '4', name: 'Serum Calcium', tests: 21, price: 319, mrp: 350 },
];

export default function TestListScreen({ navigation }: any) {
  const [active, setActive] = useState('All Filter');
  const [cart, setCart] = useState<Record<string, number>>({});

  const totalCount = useMemo(() => Object.values(cart).reduce((s, n) => s + n, 0), [cart]);

  const toggleAdd = (id: string) => setCart((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.greyText} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Popular Test</Text>
        <View style={s.headerRight}>
          <TouchableOpacity style={s.iconCircle} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={18} color={Colors.primaryDark} />
          </TouchableOpacity>
          <TouchableOpacity style={s.iconCircle} onPress={() => navigation.navigate('BookSlot')}>
            <Ionicons name="cart-outline" size={18} color={Colors.primaryDark} />
            {totalCount > 0 ? <View style={s.badge} /> : null}
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
          {FILTERS.map((f) => {
            const selected = f === active;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActive(f)}
                activeOpacity={0.8}
                style={[s.filterPill, selected && s.filterPillActive]}
              >
                <Text style={[s.filterTxt, selected && s.filterTxtActive]}>{f}</Text>
                {f === 'Sort' ? <Ionicons name="swap-vertical" size={14} color={selected ? Colors.primaryDark : '#737373'} /> : null}
                {f === 'All Filter' ? <Ionicons name="options-outline" size={14} color={selected ? Colors.primaryDark : '#737373'} /> : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: totalCount > 0 ? 120 : 90, gap: 12 }}
        renderItem={({ item }) => (
          <View style={s.card}>
            <View style={s.imgBox}>
              <Image source={FIGMA_TEST_ICON} style={{ width: 55, height: 55 }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('TestDetail', { testId: item.id })} style={{ gap: 4 }}>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.sub}>Contains {item.tests} tests</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
                  <Text style={s.price}>₹{item.price.toFixed(2)}</Text>
                  <Text style={s.mrp}>/ ₹{item.mrp.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={s.addBtn} onPress={() => toggleAdd(item.id)} activeOpacity={0.85}>
                <Text style={s.addTxt}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {totalCount > 0 ? (
        <View style={s.bottomBar}>
          <Button title="Continue" onPress={() => navigation.navigate('BookSlot')} />
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  headerRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  iconCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 7, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error },
  filterRow: { paddingHorizontal: 16, gap: 10, paddingVertical: 10 },
  filterPill: { flexDirection: 'row', gap: 8, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, backgroundColor: Colors.white, borderWidth: 1, borderColor: '#E6E6E6' },
  filterPillActive: { backgroundColor: '#EBF3FA', borderColor: '#E6E6E6' },
  filterTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: '#737373' },
  filterTxtActive: { color: Colors.primaryDark, fontFamily: FontFamily.medium },
  card: { backgroundColor: Colors.white, borderRadius: 20, borderWidth: 1, borderColor: '#E6E6E6', padding: 10, flexDirection: 'row', gap: 9 },
  imgBox: { width: 73, height: 85, borderRadius: 16, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  sub: { fontFamily: FontFamily.regular, fontSize: 8, color: '#737373' },
  price: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  mrp: { fontFamily: FontFamily.regular, fontSize: 8, color: Colors.greyNormal },
  addBtn: { alignSelf: 'flex-start', backgroundColor: Colors.primaryDark, borderRadius: 20, height: 25, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  addTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: '#EFEFEF' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, padding: 16, paddingBottom: 24, ...Shadow.lg },
});
