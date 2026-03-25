import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';
import VisaLogo from '../../assets/figma/84f0e5eb-6e04-48cd-b695-7a806752aba6.svg';

const G_PAY = require('../../assets/figma/19b59089-b275-4769-a740-1b8ba3c9b1c3.png');
const PHONE_PE = require('../../assets/figma/bd55b25b-309e-4c51-acd9-2f2ba950a640.png');
const PAYTM = require('../../assets/figma/7635b350-17ab-4827-b02c-3bbc451105d6.png');
const CRED = require('../../assets/figma/b2d73682-e1f2-4a96-a2f4-d3a836ba5594.png');

function Divider() {
  return <View style={s.divider} />;
}

function AddRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={s.addRow}>
      <View style={s.addPlusBox}>
        <Text style={s.addPlus}>+</Text>
      </View>
      <Text style={s.addText}>{label}</Text>
    </TouchableOpacity>
  );
}

function PaymentRow({ icon, title, sub, unlink }: { icon: React.ReactNode; title: string; sub?: string; unlink?: boolean }) {
  return (
    <View style={s.payRow}>
      <View style={s.payLeft}>
        <View style={s.payIconCircle}>{icon}</View>
        <View style={{ gap: 4 }}>
          <Text style={s.payTitle}>{title}</Text>
          {sub ? <Text style={s.paySub}>{sub}</Text> : null}
        </View>
      </View>
      {unlink ? <Text style={s.unlink}>unlink</Text> : null}
    </View>
  );
}

export default function PaymentSettingsScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Payment Settings" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.sectionTitle}>UPI</Text>
        <View style={s.upiRow}>
          {[
            { key: 'gpay', label: 'GPay', src: G_PAY },
            { key: 'phonepe', label: 'PhonePe', src: PHONE_PE },
            { key: 'paytm', label: 'Paytm', src: PAYTM },
            { key: 'cred', label: 'CRED', src: CRED },
          ].map((i) => (
            <View key={i.key} style={s.upiItem}>
              <View style={s.brandCircle}>
                <Image source={i.src} style={{ width: 36, height: 36, borderRadius: 18 }} resizeMode="contain" />
              </View>
              <Text style={s.brandLabel}>{i.label}</Text>
            </View>
          ))}
        </View>

        <AddRow label="Add New UPI ID" onPress={() => {}} />
        <Divider />

        <Text style={[s.sectionTitle, { marginTop: 12 }]}>Debit / Credit Card</Text>
        <View style={{ marginTop: 16, gap: 10 }}>
          <PaymentRow
            icon={<VisaLogo width={33} height={10} color={Colors.primaryDark} />}
            title="Visa"
            sub="**** 5699"
            unlink
          />
        </View>
        <AddRow label="Add New Card" onPress={() => {}} />
        <Divider />

        <Text style={[s.sectionTitle, { marginTop: 12 }]}>Wallets</Text>
        <View style={{ marginTop: 16, gap: 10 }}>
          <PaymentRow
            icon={<Image source={PHONE_PE} style={{ width: 28, height: 28, borderRadius: 14 }} resizeMode="contain" />}
            title="PhonePe Wallet"
            unlink
          />
          <PaymentRow
            icon={<Image source={PAYTM} style={{ width: 28, height: 28, borderRadius: 14 }} resizeMode="contain" />}
            title="Amazon Pay Wallet"
            unlink
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 16, paddingHorizontal: 16, paddingBottom: 120 },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyDark, marginBottom: 10 },
  upiRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 8, marginBottom: 16 },
  upiItem: { alignItems: 'center', gap: 8, width: 72 },
  brandCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  brandLabel: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },

  addRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, marginBottom: 12 },
  addPlusBox: { width: 32, height: 32, borderRadius: 10, borderWidth: 1, borderColor: Colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  addPlus: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.primaryDark, marginTop: -1 },
  addText: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },

  divider: { borderBottomWidth: 1, borderBottomColor: '#D4D4D8', borderStyle: 'dashed' },

  payRow: { height: 57, borderRadius: 16, borderWidth: 1, borderColor: '#E6E6E6', paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.white },
  payLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  payIconCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F4F4F5', alignItems: 'center', justifyContent: 'center' },
  payTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: '#3A3A3A' },
  paySub: { fontFamily: FontFamily.regular, fontSize: 12, color: '#737373' },
  unlink: { fontFamily: FontFamily.regular, fontSize: 10, color: '#296FA4' },
});

