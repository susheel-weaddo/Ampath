import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, Shadow, Typography } from '../../theme';
import { Header, SearchBar, FilterPills, Card, Badge } from '../../components';

const DATA = [
  { id: '1', name: 'Complete Blood Count (CBC)', date: '12 Mar 2026', status: 'Ready', lab: 'AMPATH Gurugram', color: '#34C759' },
  { id: '2', name: 'Thyroid Profile (T3, T4, TSH)', date: '10 Mar 2026', status: 'Processing', lab: 'AMPATH Gurugram', color: '#FF9500' },
  { id: '3', name: 'Lipid Profile', date: '08 Mar 2026', status: 'Ready', lab: 'AMPATH Sector 56', color: '#34C759' },
  { id: '4', name: 'HbA1c (Glycated Hemoglobin)', date: '01 Mar 2026', status: 'Ready', lab: 'AMPATH Gurugram', color: '#34C759' },
  { id: '5', name: 'Vitamin D (25-Hydroxy)', date: '25 Feb 2026', status: 'Ready', lab: 'AMPATH Sector 56', color: '#34C759' },
  { id: '6', name: 'Liver Function Test (LFT)', date: '20 Feb 2026', status: 'Ready', lab: 'AMPATH Gurugram', color: '#34C759' },
];

const FILTERS = ['All', 'Ready', 'Processing', 'Collected'];

export default function ReportsScreen({ navigation }: any) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = DATA.filter(r =>
    (filter === 'All' || r.status === filter) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="My Reports">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search reports..." />
        <FilterPills filters={FILTERS} active={filter} onSelect={setFilter} />
      </Header>
      <FlatList data={filtered} keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('ReportDetail', { reportId: item.id, testName: item.name })} style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, gap: 4, marginRight: 12 }}>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.lab}>{item.lab}</Text>
              </View>
              <Badge label={item.status} color={item.color} />
            </View>
            <View style={s.bottom}>
              <Text style={s.date}>{item.date}</Text>
              {item.status === 'Ready' && (
                <TouchableOpacity style={s.dlBtn}><Text style={s.dlText}>Download PDF</Text></TouchableOpacity>
              )}
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 12 }}>
            <Text style={{ fontSize: 48 }}>📋</Text>
            <Text style={{ ...Typography.body1Medium, color: Colors.greyNormal }}>No reports found</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  name: { ...Typography.body1Medium, color: Colors.greyText },
  lab: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.surfaceElevated, paddingTop: 10 },
  date: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal },
  dlBtn: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 60, borderWidth: 1, borderColor: Colors.primary },
  dlText: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: Colors.primary },
});
