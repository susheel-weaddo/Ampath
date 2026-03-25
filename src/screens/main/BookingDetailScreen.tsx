import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Shadow, Typography } from '../../theme';
import { DecorativeEllipses, Button, Card } from '../../components';

const SUMMARY = [
  { label: 'Sub Total', value: '₹1999.00' },
  { label: 'Sample collect cost', value: '₹120.00' },
  { label: 'Application Fees', value: '₹50.62' },
  { label: 'Discount', value: '-₹250.00' },
];

export default function BookingDetailScreen({ navigation }: any) {
  const [expanded, setExpanded] = useState<string | null>('1');

  const total = useMemo(() => '₹1919.62', []);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.greyText} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Booking</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 120, gap: 16 }}>
        <Card style={s.bookingCard}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={s.testIcon}>
              <Ionicons name="flask-outline" size={22} color={Colors.primaryDark} />
            </View>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={s.testName}>CBC (Complete Blood Count )</Text>
              <Text style={s.testSub}>Contains 21 tests • Also called CRP Test</Text>
              <Text style={s.testSub}>Reports within 18 hours</Text>
            </View>
          </View>

          <View style={s.hr} />

          <View style={s.row3}>
            <View style={s.rowItem}>
              <Ionicons name="calendar-outline" size={16} color={Colors.primaryDark} />
              <View>
                <Text style={s.rowLabel}>Slot</Text>
                <Text style={s.rowValue}>21 Aug | 05:00-06:00am</Text>
              </View>
            </View>
            <View style={s.rowItem}>
              <Ionicons name="home-outline" size={16} color={Colors.primaryDark} />
              <View>
                <Text style={s.rowLabel}>Collection Type</Text>
                <Text style={s.rowValue}>Home</Text>
              </View>
            </View>
          </View>

          <View style={s.hr} />

          <Text style={s.blockTitle}>Patient Details</Text>
          <Text style={s.blockValue}>Abhinav (Self)</Text>
          <Text style={s.blockValue}>+91 987654321</Text>

          <View style={s.hr} />

          <Text style={s.blockTitle}>Address</Text>
          <Text style={s.blockValue}>H-221 Noida Sector 55 201301</Text>

          <View style={s.hr} />

          <Text style={s.blockTitle}>Payment</Text>
          <Text style={s.paid}>Paid Online</Text>

          <View style={{ marginTop: 12, gap: 12 }}>
            <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate('ViewReport')} activeOpacity={0.85}>
              <Text style={s.primaryBtnTxt}>View & Download Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.outlineBtn} onPress={() => navigation.navigate('WriteReview')} activeOpacity={0.85}>
              <Text style={s.outlineBtnTxt}>Write a Review</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={{ gap: 10 }}>
          <Text style={s.sectionTitle}>Lab Test Summary</Text>
          {SUMMARY.map((it) => (
            <View key={it.label} style={s.sumRow}>
              <Text style={s.sumLabel}>{it.label}</Text>
              <Text style={s.sumValue}>{it.value}</Text>
            </View>
          ))}
          <View style={s.divider} />
          <View style={s.sumRow}>
            <Text style={[s.sumLabel, { color: Colors.primaryDark }]}>Total</Text>
            <Text style={[s.sumValue, { color: Colors.primaryDark }]}>{total}</Text>
          </View>
        </View>

        <View style={{ gap: 10, marginTop: 10 }}>
          <Text style={s.sectionTitle}>Test Precautions Information</Text>
          {[
            { id: '1', title: 'Fasting Requirement', body: 'Fasting Duration: 10–12 hours before the test.\nAllowed: Only plain water.\nAvoid: Tea, coffee, milk, juice, chewing gum, or smoking.' },
            { id: '2', title: 'Medication Instructions', body: 'Share your medications with the lab staff before collection.' },
            { id: '3', title: 'Hydration', body: 'Drink water as advised unless fasting for a specific test.' },
          ].map((acc) => {
            const open = expanded === acc.id;
            return (
              <Card key={acc.id} style={{ padding: 0, overflow: 'hidden' as any }}>
                <TouchableOpacity style={s.accRow} activeOpacity={0.75} onPress={() => setExpanded((p) => (p === acc.id ? null : acc.id))}>
                  <Text style={s.accTitle}>{acc.id}. {acc.title}</Text>
                  <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.greyNormal} />
                </TouchableOpacity>
                {open ? (
                  <View style={s.accBody}>
                    <Text style={s.accText}>{acc.body}</Text>
                  </View>
                ) : null}
              </Card>
            );
          })}
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <Button title="View Status" onPress={() => { }} />
        <TouchableOpacity style={s.homeBtn} onPress={() => navigation.navigate('Tabs')}>
          <Text style={s.homeBtnTxt}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  bookingCard: { borderRadius: 16, borderWidth: 1, borderColor: '#E4E4E7' },
  testIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  testName: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  testSub: { fontFamily: FontFamily.regular, fontSize: 12, color: '#4C4C4C' },
  hr: { height: 1, backgroundColor: '#E4E4E7', marginVertical: 12 },
  row3: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  rowItem: { flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center' },
  rowLabel: { fontFamily: FontFamily.regular, fontSize: 10, color: '#4C4C4C' },
  rowValue: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, marginTop: 2 },
  blockTitle: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark, marginBottom: 8 },
  blockValue: { fontFamily: FontFamily.regular, fontSize: 14, color: '#666' },
  paid: { fontFamily: FontFamily.medium, fontSize: 12, color: '#21AC61' },
  primaryBtn: { backgroundColor: Colors.primaryDark, borderRadius: 60, paddingVertical: 14, alignItems: 'center' },
  primaryBtnTxt: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.white },
  outlineBtn: { borderWidth: 1, borderColor: Colors.primaryDark, borderRadius: 60, paddingVertical: 14, alignItems: 'center' },
  outlineBtnTxt: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sumLabel: { fontFamily: FontFamily.regular, fontSize: 14, color: '#71717A' },
  sumValue: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  divider: { height: 1, backgroundColor: '#E6E6E6', marginTop: 6 },
  accRow: { paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accTitle: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  accBody: { paddingHorizontal: 16, paddingBottom: 14, borderTopWidth: 1, borderTopColor: '#E6E6E6' },
  accText: { ...Typography.body2, color: Colors.greyNormal, marginTop: 10, lineHeight: 18 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, ...Shadow.lg, gap: 12 },
  homeBtn: { borderWidth: 1, borderColor: Colors.primaryDark, borderRadius: 60, paddingVertical: 14, alignItems: 'center' },
  homeBtnTxt: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
});

