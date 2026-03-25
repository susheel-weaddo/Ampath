import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadow, Typography } from '../../theme';
import { Header, SearchBar, FilterPills, Card, Button } from '../../components';

const { width: SW } = Dimensions.get('window');

const TESTS = [
  { id: '1', name: 'Complete Blood Count (CBC)', price: 450, mrp: 600, pop: true },
  { id: '2', name: 'Thyroid Profile (T3, T4, TSH)', price: 800, mrp: 1200, pop: true },
  { id: '3', name: 'Lipid Profile', price: 600, mrp: 850, pop: false },
  { id: '4', name: 'HbA1c (Glycated Hemoglobin)', price: 500, mrp: 700, pop: false },
  { id: '5', name: 'Vitamin D (25-Hydroxy)', price: 900, mrp: 1400, pop: true },
  { id: '6', name: 'Vitamin B12', price: 700, mrp: 1000, pop: false },
  { id: '7', name: 'Liver Function Test (LFT)', price: 550, mrp: 800, pop: false },
  { id: '8', name: 'Kidney Function Test (KFT)', price: 600, mrp: 900, pop: false },
  { id: '9', name: 'Iron Studies', price: 750, mrp: 1100, pop: false },
  { id: '10', name: 'Urine Routine', price: 200, mrp: 350, pop: false },
];

const PACKAGES = [
  { id: 'p1', name: 'Full Body Checkup', tests: 72, price: 1999, mrp: 4500, color: Colors.primary },
  { id: 'p2', name: 'Diabetes Care', tests: 24, price: 999, mrp: 2200, color: Colors.brand },
  { id: 'p3', name: 'Heart Health', tests: 38, price: 1499, mrp: 3500, color: '#2562A0' },
];

const CATS = ['All', 'Blood Tests', 'Packages', 'Popular'];

export default function BookTestScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState<string[]>([]);

  const filtered = TESTS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    (cat === 'All' || (cat === 'Popular' && t.pop))
  );

  const toggle = (id: string) => setCart(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const total = TESTS.filter(t => cart.includes(t.id)).reduce((s, t) => s + t.price, 0);

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Book Tests" showBack onBack={() => navigation.goBack()}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search tests, packages..." />
        <FilterPills filters={CATS} active={cat} onSelect={setCat} />
      </Header>

      <FlatList data={filtered} keyExtractor={i => i.id} showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: cart.length > 0 ? 120 : 100 }}
        ListHeaderComponent={
          (cat === 'All' || cat === 'Packages') ? (
            <View style={{ marginBottom: 20 }}>
              <Text style={s.secTitle}>Health Packages</Text>
              <FlatList data={PACKAGES} horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }} snapToInterval={SW * 0.72 + 12} decelerationRate="fast"
                renderItem={({ item }) => (
                  <TouchableOpacity style={[s.pkgCard, { backgroundColor: item.color }]} activeOpacity={0.8}>
                    <Text style={s.pkgName}>{item.name}</Text>
                    <Text style={s.pkgTests}>{item.tests} tests included</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <Text style={s.pkgPrice}>₹{item.price.toLocaleString()}</Text>
                      <Text style={s.pkgMrp}>₹{item.mrp.toLocaleString()}</Text>
                    </View>
                    <View style={s.pkgBtn}><Text style={s.pkgBtnTxt}>View Details</Text></View>
                  </TouchableOpacity>
                )} keyExtractor={i => i.id} />
              <Text style={[s.secTitle, { marginTop: 20 }]}>Individual Tests</Text>
            </View>
          ) : <Text style={s.secTitle}>Individual Tests</Text>
        }
        renderItem={({ item }) => {
          const inCart = cart.includes(item.id);
          const disc = Math.round((1 - item.price / item.mrp) * 100);
          return (
            <Card style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ flex: 1, gap: 6, marginRight: 12 }}>
                <Text style={s.testName}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={s.testPrice}>₹{item.price}</Text>
                  <Text style={s.testMrp}>₹{item.mrp}</Text>
                  <View style={s.discBadge}><Text style={s.discText}>{disc}% off</Text></View>
                </View>
              </View>
              <TouchableOpacity style={[s.addBtn, inCart && s.addBtnActive]} onPress={() => toggle(item.id)}>
                <Text style={[s.addTxt, inCart && { color: '#fff' }]}>{inCart ? 'Added' : 'Add'}</Text>
              </TouchableOpacity>
            </Card>
          );
        }}
      />

      {cart.length > 0 && (
        <View style={s.cartBar}>
          <View>
            <Text style={s.cartCount}>{cart.length} test{cart.length > 1 ? 's' : ''} selected</Text>
            <Text style={s.cartTotal}>₹{total.toLocaleString()}</Text>
          </View>
          <Button title="Proceed" onPress={() => navigation.navigate('BookSlot')} fullWidth={false} style={{ paddingHorizontal: 32 }} />
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  secTitle: { ...Typography.body1Medium, color: Colors.greyText, marginBottom: 12 },
  pkgCard: { width: SW * 0.72, borderRadius: BorderRadius.xl, padding: 20, gap: 4 },
  pkgName: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: '#fff' },
  pkgTests: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: 'rgba(255,255,255,0.8)' },
  pkgPrice: { fontFamily: FontFamily.bold, fontSize: FontSize.h3, color: '#fff' },
  pkgMrp: { fontFamily: FontFamily.regular, fontSize: FontSize.body2, color: 'rgba(255,255,255,0.6)', textDecorationLine: 'line-through' },
  pkgBtn: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 14, borderRadius: BorderRadius.pill, marginTop: 6 },
  pkgBtnTxt: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: Colors.primary },
  testName: { ...Typography.body1Medium, color: Colors.greyText },
  testPrice: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.greyText },
  testMrp: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal, textDecorationLine: 'line-through' },
  discBadge: { backgroundColor: '#E8F5E9', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4 },
  discText: { fontFamily: FontFamily.medium, fontSize: 9, color: '#2E7D32' },
  addBtn: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: BorderRadius.pill, borderWidth: 1.5, borderColor: Colors.primary },
  addBtnActive: { backgroundColor: Colors.primary },
  addTxt: { fontFamily: FontFamily.medium, fontSize: FontSize.body2, color: Colors.primary },
  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 34, borderTopLeftRadius: 20, borderTopRightRadius: 20, ...Shadow.lg },
  cartCount: { fontFamily: FontFamily.medium, fontSize: FontSize.body2, color: Colors.greyNormal },
  cartTotal: { fontFamily: FontFamily.semiBold, fontSize: FontSize.h3, color: Colors.greyText },
});
