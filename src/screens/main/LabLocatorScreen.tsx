import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadow, Typography } from '../../theme';
import { Header, SearchBar, Card, Badge } from '../../components';

const LABS = [
  { id: '1', name: 'AMPATH Gurugram', address: 'Sector 56, Gurugram, Haryana', hours: '7:00 AM – 8:00 PM', phone: '+91 99999 99999', rating: 4.6, isOpen: true, services: ['Lab Tests', 'Radiology'] },
  { id: '2', name: 'AMPATH Sector 44', address: 'Sector 44, Gurugram, Haryana', hours: '8:00 AM – 7:00 PM', phone: '+91 88888 88888', rating: 4.3, isOpen: true, services: ['Lab Tests', 'Home Collection'] },
  { id: '3', name: 'AMPATH DLF Phase 3', address: 'DLF Phase 3, Gurugram, Haryana', hours: '9:00 AM – 6:00 PM', phone: '+91 77777 77777', rating: 4.2, isOpen: false, services: ['Lab Tests'] },
];

export default function LabLocatorScreen({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return LABS;
    return LABS.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.address.toLowerCase().includes(q) ||
      l.services.some(s => s.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Find a Lab" showBack onBack={() => navigation.goBack()}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search labs, area, services..." />
      </Header>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 10 }}
        renderItem={({ item }) => (
          <Card style={{ gap: 10 }}>
            <View style={s.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.addr}>{item.address}</Text>
              </View>
              <Badge label={item.isOpen ? 'Open' : 'Closed'} color={item.isOpen ? Colors.success : Colors.greyNormal} />
            </View>

            <View style={s.metaRow}>
              <View style={s.metaPill}>
                <Text style={s.metaTxt}>⭐ {item.rating.toFixed(1)}</Text>
              </View>
              <View style={s.metaPill}>
                <Text style={s.metaTxt}>🕘 {item.hours}</Text>
              </View>
            </View>

            <View style={s.servicesRow}>
              {item.services.slice(0, 3).map((sv) => (
                <View key={sv} style={s.svcChip}>
                  <Text style={s.svcTxt}>{sv}</Text>
                </View>
              ))}
            </View>

            <View style={s.footer}>
              <Text style={s.phone}>📞 {item.phone}</Text>
              <Text style={s.hint}>Map view can be added later.</Text>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 10 }}>
            <Text style={{ fontSize: 44 }}>📍</Text>
            <Text style={{ ...Typography.body1Medium, color: Colors.greyText }}>No labs found</Text>
            <Text style={{ ...Typography.body2, color: Colors.greyNormal, textAlign: 'center' }}>
              Try searching by city, sector, or service.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  name: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.greyText },
  addr: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal, marginTop: 2 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaPill: { backgroundColor: Colors.surfaceElevated, borderRadius: BorderRadius.pill, paddingVertical: 6, paddingHorizontal: 10 },
  metaTxt: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: Colors.greyText },
  servicesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  svcChip: { backgroundColor: Colors.blueTint, borderRadius: BorderRadius.pill, paddingVertical: 6, paddingHorizontal: 10 },
  svcTxt: { fontFamily: FontFamily.medium, fontSize: 10, color: Colors.primaryDark },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.surfaceElevated, paddingTop: 10 },
  phone: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyText },
  hint: { fontFamily: FontFamily.regular, fontSize: 10, color: Colors.greyNormal },
});

