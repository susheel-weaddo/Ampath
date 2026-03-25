import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, BorderRadius, Typography } from '../../theme';
import { Header, Card } from '../../components';

const FAQ = [
  { id: '1', q: 'How do I download my report?', a: 'Open My Reports, select a report, and tap Download PDF once it is Ready.' },
  { id: '2', q: 'Can I reschedule a home collection?', a: 'Go to My Bookings → Upcoming → Reschedule. You can choose a new slot based on availability.' },
  { id: '3', q: 'How do I add a family member?', a: 'Profile → Family Members → Add Member. Then select the member while booking tests.' },
  { id: '4', q: 'What if my OTP is not received?', a: 'Wait for 30 seconds and tap Resend OTP. Ensure your mobile number has network coverage.' },
];

export default function HelpFaqScreen({ navigation }: any) {
  const [openId, setOpenId] = useState<string | null>(FAQ[0]?.id ?? null);

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Help & FAQ" showBack onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}>
        {FAQ.map((item) => {
          const open = openId === item.id;
          return (
            <Card key={item.id} style={{ padding: 0 }}>
              <TouchableOpacity
                onPress={() => setOpenId((p) => (p === item.id ? null : item.id))}
                activeOpacity={0.7}
                style={s.qRow}
              >
                <Text style={s.q}>{item.q}</Text>
                <Text style={s.chev}>{open ? '−' : '+'}</Text>
              </TouchableOpacity>
              {open ? (
                <View style={s.aWrap}>
                  <Text style={s.a}>{item.a}</Text>
                </View>
              ) : null}
            </Card>
          );
        })}
        <Text style={s.note}>For more help, use Contact Us in Profile.</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  qRow: { padding: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  q: { flex: 1, fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: Colors.greyText },
  chev: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.primary, width: 18, textAlign: 'right' },
  aWrap: { paddingHorizontal: 16, paddingBottom: 16, borderTopWidth: 1, borderTopColor: Colors.surfaceElevated },
  a: { ...Typography.body2, color: Colors.greyNormal, marginTop: 12 },
  note: { ...Typography.caption1, color: Colors.greyNormal, textAlign: 'center', marginTop: 10 },
});

