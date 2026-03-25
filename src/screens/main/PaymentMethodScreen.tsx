import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Typography } from '../../theme';
import { DecorativeEllipses, Card } from '../../components';

const UPI = [
  { id: 'gpay', label: 'GPay', image: require('../../assets/figma/ecfd0d86-e0ab-4954-883b-2270de8900f9.png') },
  { id: 'phonepe', label: 'PhonePe', image: require('../../assets/figma/f3436b7f-1cc4-4098-8eaf-db7650dabf35.jpg') },
  { id: 'paytm', label: 'Paytm', image: require('../../assets/figma/3e705dab-6b9a-4632-9d13-2db6a4c2bfcf.png') },
  { id: 'cred', label: 'CRED', image: require('../../assets/figma/9997c0b0-ccf9-4471-9ac7-6b54565d2874.png') },
];

const ROWS = [
  { id: 'card', title: 'Debit / Credit Card' },
  { id: 'wallet1', title: 'PhonePe Wallet' },
  { id: 'wallet2', title: 'Amazon Pay Wallet' },
  { id: 'cod', title: 'Cash on Visit' },
];

export default function PaymentMethodScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.greyText} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Payment Method</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        <Text style={s.toPay}>
          <Text style={{ color: Colors.primaryDark }}>{'To Pay: '}</Text>
          <Text style={{ color: '#21AC61' }}>₹1919.62</Text>
        </Text>
        <View style={s.divider} />

        <View style={{ marginTop: 18, gap: 12 }}>
                <Text style={s.section}>Pay by UPI</Text>
          <View style={s.upiRow}>
            {UPI.map((u) => (
              <TouchableOpacity key={u.id} style={s.upiItem} activeOpacity={0.85} onPress={() => navigation.navigate('PaymentConfirmation')}>
                <View style={s.upiCircle}>
                  <Image source={u.image} style={{ width: 42, height: 42 }} resizeMode="contain" />
                </View>
                <Text style={s.upiLabel}>{u.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={s.addUpiRow} activeOpacity={0.85}>
            <View style={s.addUpiBtn}>
              <Text style={s.addUpiPlus}>+</Text>
            </View>
            <Text style={s.addUpiTxt}>Add New UPI ID</Text>
          </TouchableOpacity>
        </View>

        <View style={[s.divider, { marginTop: 18 }]} />

        <View style={{ marginTop: 18, gap: 12 }}>
          {ROWS.map((r) => (
            <Card key={r.id} style={s.methodRow} onPress={() => navigation.navigate('PaymentConfirmation')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Ionicons name={r.id === 'card' ? 'card-outline' : r.id === 'cod' ? 'cash-outline' : 'wallet-outline'} size={22} color={Colors.primaryDark} />
                <Text style={s.methodTitle}>{r.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.greyNormal} />
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  toPay: { fontFamily: FontFamily.semiBold, fontSize: 22 },
  divider: { height: 1, backgroundColor: '#E6E6E6', marginTop: 16, opacity: 0.8 },
  section: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyNormal },
  upiRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  upiItem: { alignItems: 'center', gap: 8, flex: 1 },
  upiCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  upiLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.greyNormal },
  addUpiRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 },
  addUpiBtn: { width: 32, height: 32, borderRadius: 10, borderWidth: 1, borderColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  addUpiPlus: { fontFamily: FontFamily.medium, fontSize: 18, color: Colors.primaryDark, marginTop: -1 },
  addUpiTxt: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  methodRow: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E6E6E6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  methodTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
});
