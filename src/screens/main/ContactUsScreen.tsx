import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { Colors, FontFamily, FontSize, BorderRadius, Typography } from '../../theme';
import { Header, Card } from '../../components';

export default function ContactUsScreen({ navigation }: any) {
  const phone = '+91 99999 99999';
  const email = 'support@ampath.example';

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Contact Us" showBack onBack={() => navigation.goBack()} />

      <View style={{ padding: 16, gap: 10 }}>
        <Card style={{ gap: 12 }}>
          <Text style={s.title}>We’re here to help</Text>
          <Text style={s.desc}>Reach out for bookings, reports, or support queries.</Text>

          <View style={s.item}>
            <Text style={s.label}>Phone</Text>
            <Text style={s.value}>{phone}</Text>
          </View>
          <View style={s.item}>
            <Text style={s.label}>Email</Text>
            <Text style={s.value}>{email}</Text>
          </View>

          <View style={s.row}>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)} style={s.btn} activeOpacity={0.8}>
              <Text style={s.btnTxt}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)} style={[s.btn, { backgroundColor: Colors.blueTint }]} activeOpacity={0.8}>
              <Text style={[s.btnTxt, { color: Colors.primaryDark }]}>Email</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={{ gap: 10 }}>
          <Text style={s.title}>Business Hours</Text>
          <Text style={s.desc}>Monday to Sunday • 7:00 AM – 9:00 PM</Text>
        </Card>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  title: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.greyText },
  desc: { ...Typography.body2, color: Colors.greyNormal },
  item: { gap: 4, paddingTop: 8 },
  label: { ...Typography.caption1, color: Colors.greyNormal },
  value: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: Colors.greyText },
  row: { flexDirection: 'row', gap: 10, paddingTop: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: BorderRadius.pill, alignItems: 'center', backgroundColor: Colors.primary },
  btnTxt: { fontFamily: FontFamily.medium, fontSize: FontSize.body2, color: Colors.white },
});

