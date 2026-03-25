import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, Shadow, Typography } from '../../theme';
import { DecorativeEllipses, Card, Button } from '../../components';

const TEST_ICON = require('../../assets/figma/2b85d1c5-5300-46db-b7dd-57d9f5b6cd73.png');

export default function BookingSuccessScreen({ navigation }: any) {
  const [expanded, setExpanded] = useState<string | null>('1');

  const precautions = useMemo(() => ([
    { id: '1', title: 'Fasting Requirement', body: '• Fasting Duration: 10–12 hours before the test.\n• Allowed: Only plain water.\n• Avoid: Tea, coffee, milk, juice, chewing gum, or smoking.' },
    { id: '2', title: 'Medication Instructions', body: 'Share your medications with the lab staff before collection.' },
    { id: '3', title: 'Hydration', body: 'Drink water as advised unless fasting for a specific test.' },
    { id: '4', title: 'Avoid the Following 24 Hours Before Test', body: 'Avoid alcohol and intense exercise 24 hours before the test.' },
    { id: '5', title: 'Special Instructions for Females', body: 'Share pregnancy status and cycle details if relevant.' },
    { id: '6', title: 'Clothing and Accessories', body: 'Wear comfortable clothing and avoid tight sleeves.' },
    { id: '7', title: 'Documents to Carry', body: 'Carry a valid ID and previous reports if available.' },
  ]), []);

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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 160, gap: 16 }}>
        <View style={{ alignItems: 'center', gap: 10, marginTop: 6 }}>
          <View style={s.illus}>
            <Ionicons name="calendar-outline" size={42} color={Colors.greyLight} />
            <View style={s.checkDot}>
              <Ionicons name="checkmark" size={14} color={Colors.white} />
            </View>
          </View>
          <Text style={s.success}>Booking Success</Text>
        </View>

        <Card style={s.infoCard}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={s.iconBox}>
              <Image source={TEST_ICON} style={{ width: 34, height: 34 }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={s.testTitle}>CBC (Complete Blood Count )</Text>
              <Text style={s.testSub}>Contains 21 tests • Also called CRP Test</Text>
              <Text style={s.testSub}>Reports within 18 hours</Text>
            </View>
          </View>

          <View style={s.hr} />

          <View style={s.row2}>
            <View style={s.rowItem}>
              <Ionicons name="calendar-outline" size={16} color={Colors.primaryDark} />
              <View>
                <Text style={s.rowLabel}>Slot</Text>
                <Text style={s.rowValue}>21 Aug | 05:00-06:00am</Text>
              </View>
            </View>
            <View style={s.rowItem}>
              <Ionicons name="business-outline" size={16} color={Colors.primaryDark} />
              <View>
                <Text style={s.rowLabel}>Collection Type</Text>
                <Text style={s.rowValue}>Walk-in</Text>
              </View>
            </View>
          </View>

          <View style={s.hr} />

          <View style={{gap: 4}}>
            <Text style={s.blockTitle}>Patient Details</Text>
            <Text style={s.blockValue}>Abhinav (Self)</Text>
            <Text style={s.blockValue}>+91 987654321</Text>
          </View>

          <View style={s.hr} />

          <View style={{gap: 4}}>
            <Text style={s.blockTitle}>Payment</Text>
            <Text style={s.paid}>Paid Online</Text>
          </View>
        </Card>

        <View style={{ gap: 10, marginTop: 30 }}>
          <Text style={s.sectionTitle}>Test Precautions Information</Text>
          {precautions.map((acc) => {
            const open = expanded === acc.id;
            return (
              <Card key={acc.id} style={{ padding: 0, overflow: 'hidden' as any, borderWidth: 1, borderColor: '#E6E6E6' }}>
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
        <Button title="View Status" onPress={() => navigation.navigate('TrackOrder')} />
        <TouchableOpacity style={s.homeBtn} activeOpacity={0.85} onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}>
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
  illus: { width: 86, height: 86, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4F5' },
  checkDot: { position: 'absolute', right: 10, bottom: 10, width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  success: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.primaryDark },
  infoCard: { borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 13, gap: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  testTitle: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  testSub: { fontFamily: FontFamily.regular, fontSize: 10, color: '#737373' },
  hr: { height: 1, backgroundColor: '#E6E6E6', opacity: 0.8 },
  row2: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  rowItem: { flexDirection: 'row', gap: 10, alignItems: 'center', flex: 1 },
  rowLabel: { fontFamily: FontFamily.regular, fontSize: 10, color: Colors.greyNormal },
  rowValue: { fontFamily: FontFamily.regular, fontSize: 10, color: Colors.primaryDark, marginTop: 2 },
  blockTitle: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  blockValue: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyText, marginTop: 2 },
  paid: { fontFamily: FontFamily.regular, fontSize: 12, color: '#21AC61', marginTop: 2 },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  accRow: { paddingVertical: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  accTitle: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark, flex: 1, paddingRight: 12 },
  accBody: { paddingHorizontal: 14, paddingBottom: 12 },
  accText: { ...Typography.body2, color: Colors.greyNormal, lineHeight: 18 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24, ...Shadow.lg, gap: 12 },
  homeBtn: { borderWidth: 1, borderColor: Colors.primaryDark, borderRadius: 60, paddingVertical: 14, alignItems: 'center' },
  homeBtnTxt: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
});
