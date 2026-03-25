import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, BorderRadius, Typography } from '../../theme';
import { Header, Card, Badge } from '../../components';

const INVOICES = [
  { id: 'INV-2201', orderId: 'AMP-10201', date: '10 Mar 2026', amount: '₹1,200', status: 'Paid', color: Colors.success },
  { id: 'INV-2177', orderId: 'AMP-10188', date: '02 Mar 2026', amount: '₹800', status: 'Paid', color: Colors.success },
];

export default function PaymentsInvoicesScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Payments & Invoices" showBack onBack={() => navigation.goBack()} />

      <FlatList
        data={INVOICES}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={{ gap: 10 }}>
            <View style={s.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={s.title}>{item.id}</Text>
                <Text style={s.meta}>Order: {item.orderId} • {item.date}</Text>
              </View>
              <Badge label={item.status} color={item.color} />
            </View>
            <View style={s.footer}>
              <Text style={s.amount}>{item.amount}</Text>
              <TouchableOpacity style={s.btn} activeOpacity={0.7}>
                <Text style={s.btnTxt}>Download</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 10 }}>
            <Text style={{ fontSize: 44 }}>💳</Text>
            <Text style={{ ...Typography.body1Medium, color: Colors.greyText }}>No invoices found</Text>
            <Text style={{ ...Typography.body2, color: Colors.greyNormal, textAlign: 'center' }}>
              Your payment receipts will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceElevated },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.greyText },
  meta: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.greyNormal, marginTop: 2 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.surfaceElevated, paddingTop: 10 },
  amount: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.greyText },
  btn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: BorderRadius.pill, backgroundColor: Colors.blueTint },
  btnTxt: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: Colors.primaryDark },
});

