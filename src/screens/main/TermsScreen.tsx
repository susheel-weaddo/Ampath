import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography } from '../../theme';
import { Header, Card } from '../../components';

export default function TermsScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Terms & Conditions" showBack onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}>
        <Card style={{ gap: 10 }}>
          <Text style={s.h}>1. Overview</Text>
          <Text style={s.p}>
            These terms are placeholders in the demo app. Replace this content with the official AMPATH terms provided by your legal team.
          </Text>
          <Text style={s.h}>2. Service</Text>
          <Text style={s.p}>
            Bookings, reports, and payments shown in the app may be subject to availability and verification.
          </Text>
          <Text style={s.h}>3. Liability</Text>
          <Text style={s.p}>
            Use of this app is at your own discretion. For emergencies, contact your doctor or local emergency services.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  h: { ...Typography.body1Medium, color: Colors.greyText },
  p: { ...Typography.body2, color: Colors.greyNormal, lineHeight: 20 },
});

