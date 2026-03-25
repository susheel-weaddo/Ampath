import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Spacing, BorderRadius, Shadow, Typography } from '../../theme';
import { Header, Card, Input, Button, Badge } from '../../components';

const STEPS = [
  { id: 's1', title: 'Order Confirmed', desc: 'Your booking is confirmed.' },
  { id: 's2', title: 'Agent Assigned', desc: 'A phlebotomist has been assigned.' },
  { id: 's3', title: 'Sample Collected', desc: 'Sample collected and sent to the lab.' },
  { id: 's4', title: 'Report Processing', desc: 'Lab is processing your report.' },
  { id: 's5', title: 'Report Ready', desc: 'Your report is ready to view.' },
];

export default function TrackOrderScreen({ navigation }: any) {
  const [orderId, setOrderId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const progressIndex = useMemo(() => {
    if (!submitted) return -1;
    if (!orderId.trim()) return 1;
    const last = Math.min(orderId.trim().length, 5) - 1;
    return Math.max(0, Math.min(STEPS.length - 1, last));
  }, [orderId, submitted]);

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Track Order" showBack onBack={() => navigation.goBack()} />

      <View style={{ padding: 16, gap: 12 }}>
        <Card style={{ gap: 12 }}>
          <Text style={s.hint}>Enter your booking/order ID to see status.</Text>
          <Input
            label="Order ID"
            value={orderId}
            onChangeText={setOrderId}
            placeholder="e.g. AMPATH-12345"
            autoCapitalize="characters"
          />
          <Button title="Track" onPress={() => setSubmitted(true)} />
        </Card>

        {submitted && (
          <Card style={{ gap: 12 }}>
            <View style={s.row}>
              <Text style={s.sectionTitle}>Current Status</Text>
              <Badge label={progressIndex >= 3 ? 'In Progress' : 'Booked'} color={Colors.primary} />
            </View>

            <View style={{ gap: 10 }}>
              {STEPS.map((st, i) => {
                const done = i <= progressIndex;
                return (
                  <View key={st.id} style={s.stepRow}>
                    <View style={[s.dot, done ? s.dotDone : s.dotTodo]} />
                    <View style={{ flex: 1 }}>
                      <Text style={[s.stepTitle, done && { color: Colors.greyText }]}>{st.title}</Text>
                      <Text style={s.stepDesc}>{st.desc}</Text>
                    </View>
                    <Text style={s.stepMark}>{done ? '✓' : ''}</Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity onPress={() => { setOrderId(''); setSubmitted(false); }} style={s.resetBtn}>
              <Text style={s.resetTxt}>Reset</Text>
            </TouchableOpacity>
          </Card>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hint: { ...Typography.body2, color: Colors.greyNormal },
  sectionTitle: { ...Typography.body1Medium, color: Colors.greyText },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 4 },
  dotDone: { backgroundColor: Colors.success },
  dotTodo: { backgroundColor: Colors.greyLight },
  stepTitle: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: Colors.greyNormal },
  stepDesc: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal, marginTop: 2 },
  stepMark: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.success, width: 20, textAlign: 'right' },
  resetBtn: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: BorderRadius.pill, backgroundColor: Colors.surfaceElevated },
  resetTxt: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: Colors.primary },
});

