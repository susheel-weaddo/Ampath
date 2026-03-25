import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography } from '../../theme';
import { Header, Card } from '../../components';

export default function PrivacyPolicyScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Privacy Policy" showBack onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}>
        <Card style={{ gap: 10 }}>
          <Text style={s.h}>Data We Collect</Text>
          <Text style={s.p}>
            This demo uses mock data. Replace this policy with the official privacy policy describing data collection, usage, and retention.
          </Text>
          <Text style={s.h}>Permissions</Text>
          <Text style={s.p}>
            When enabled, permissions like notifications, location, or camera are used only for the related features (e.g. alerts, finding labs, uploading prescriptions).
          </Text>
          <Text style={s.h}>Security</Text>
          <Text style={s.p}>
            Protect user data with secure authentication, encrypted transport (HTTPS), and least-privilege access controls.
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

