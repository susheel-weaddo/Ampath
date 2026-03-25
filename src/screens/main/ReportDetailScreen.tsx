import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadow, Typography } from '../../theme';
import { Header, Button, Card } from '../../components';

const PARAMS = [
  { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '13.0-17.0', status: 'normal' },
  { name: 'RBC Count', value: '5.1', unit: 'M/μL', range: '4.5-5.5', status: 'normal' },
  { name: 'WBC Count', value: '11200', unit: '/μL', range: '4000-10000', status: 'high' },
  { name: 'Platelet Count', value: '245000', unit: '/μL', range: '150K-400K', status: 'normal' },
  { name: 'Hematocrit', value: '42.5', unit: '%', range: '40-50', status: 'normal' },
  { name: 'MCV', value: '88', unit: 'fL', range: '80-100', status: 'normal' },
  { name: 'MCH', value: '28.5', unit: 'pg', range: '27-32', status: 'normal' },
  { name: 'Neutrophils', value: '68', unit: '%', range: '40-70', status: 'normal' },
  { name: 'Lymphocytes', value: '24', unit: '%', range: '20-40', status: 'normal' },
  { name: 'ESR', value: '18', unit: 'mm/hr', range: '0-15', status: 'high' },
];

const statusColor = (st: string) => st === 'high' ? Colors.error : st === 'low' ? Colors.warning : Colors.success;

export default function ReportDetailScreen({ navigation, route }: any) {
  const { testName } = route.params || {};
  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Report Details" showBack onBack={() => navigation.goBack()}
        rightElement={<TouchableOpacity><Text style={{ fontSize: 20, color: '#fff' }}>↗</Text></TouchableOpacity>} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <Card style={{ gap: 12, marginBottom: 20 }}>
          <Text style={s.testName}>{testName || 'Complete Blood Count (CBC)'}</Text>
          <View style={s.row}>
            <View style={{ gap: 2 }}><Text style={s.metaLabel}>Date</Text><Text style={s.metaVal}>12 Mar 2026</Text></View>
            <View style={{ gap: 2 }}><Text style={s.metaLabel}>Lab</Text><Text style={s.metaVal}>AMPATH Gurugram</Text></View>
          </View>
          <View style={{ height: 1, backgroundColor: Colors.surfaceElevated }} />
          <View style={s.row}>
            <View style={{ gap: 2 }}><Text style={s.metaLabel}>Patient</Text><Text style={s.metaVal}>Sanchit Babbar</Text></View>
            <View style={{ gap: 2 }}><Text style={s.metaLabel}>Age/Gender</Text><Text style={s.metaVal}>30 Yrs / Male</Text></View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={s.metaLabel}>Sample ID: </Text>
            <Text style={[s.metaVal, { color: Colors.primaryDark }]}>AMP-2026-0034521</Text>
          </View>
        </Card>

        {/* Results Table */}
        <Text style={{ ...Typography.body1Medium, color: Colors.greyText, marginBottom: 12 }}>Test Results</Text>
        <View style={{ borderRadius: BorderRadius.md, overflow: 'hidden', marginBottom: 24 }}>
          <View style={s.tableHead}>
            <Text style={[s.colH, { flex: 2.2 }]}>Parameter</Text>
            <Text style={[s.colH, { flex: 1, textAlign: 'center' }]}>Value</Text>
            <Text style={[s.colH, { flex: 1.3, textAlign: 'right' }]}>Ref. Range</Text>
          </View>
          {PARAMS.map((p, i) => (
            <View key={i} style={[s.tableRow, i % 2 === 0 && { backgroundColor: '#FAFBFC' }, p.status !== 'normal' && { backgroundColor: '#FFF5F5' }]}>
              <Text style={[s.paramName, { flex: 2.2 }]}>{p.name}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                <Text style={[s.paramVal, { color: statusColor(p.status) }]}>{p.value}</Text>
                {p.status !== 'normal' && <Text style={{ color: statusColor(p.status), fontFamily: FontFamily.bold, fontSize: 12 }}>{p.status === 'high' ? '↑' : '↓'}</Text>}
              </View>
              <View style={{ flex: 1.3 }}>
                <Text style={s.paramRange}>{p.range}</Text>
                <Text style={s.paramUnit}>{p.unit}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ gap: 12 }}>
          <Button title="Download PDF Report" onPress={() => {}} />
          <Button title="Share Report" onPress={() => {}} variant="outline" />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  testName: { ...Typography.h3, color: Colors.brand },
  row: { flexDirection: 'row', gap: 20 },
  metaLabel: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal, textTransform: 'uppercase', letterSpacing: 0.3 },
  metaVal: { fontFamily: FontFamily.medium, fontSize: FontSize.body2, color: Colors.greyText },
  tableHead: { flexDirection: 'row', backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 14 },
  colH: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.3 },
  tableRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: Colors.surfaceElevated },
  paramName: { fontFamily: FontFamily.regular, fontSize: FontSize.body2, color: Colors.greyText },
  paramVal: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body2 },
  paramRange: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal, textAlign: 'right' },
  paramUnit: { fontFamily: FontFamily.regular, fontSize: 9, color: Colors.greyLight, textAlign: 'right' },
});
