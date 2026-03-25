import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, FontSize, Typography } from '../../theme';
import { Header, Card, Badge } from '../../components';

const ORDERS = [
  { id: 'AMP-10201', title: 'Vitamin B12 + Vitamin D', date: '10 Mar 2026', status: 'Completed', color: Colors.success, price: '₹1,200' },
  { id: 'AMP-10188', title: 'Thyroid Profile', date: '02 Mar 2026', status: 'Completed', color: Colors.success, price: '₹800' },
  { id: 'AMP-10140', title: 'CBC', date: '18 Feb 2026', status: 'Cancelled', color: Colors.error, price: '₹450' },
];

export default function OrderHistoryScreen({ navigation }: any) {
  const [items] = useState(ORDERS);

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      <Header title="Order History" showBack onBack={() => navigation.goBack()} />

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={{ gap: 10 }}>
            <View style={s.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={s.title}>{item.title}</Text>
                <Text style={s.meta}>Order ID: {item.id} • {item.date}</Text>
              </View>
              <Badge label={item.status} color={item.color} />
            </View>
            <Text style={s.price}>{item.price}</Text>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 10 }}>
            <Text style={{ fontSize: 44 }}>📋</Text>
            <Text style={{ ...Typography.body1Medium, color: Colors.greyText }}>No orders yet</Text>
            <Text style={{ ...Typography.body2, color: Colors.greyNormal, textAlign: 'center' }}>
              Your completed and cancelled bookings will appear here.
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
  price: { fontFamily: FontFamily.semiBold, fontSize: FontSize.body1, color: Colors.greyText, borderTopWidth: 1, borderTopColor: Colors.surfaceElevated, paddingTop: 10 },
});

