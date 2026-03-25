import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, BorderRadius, Shadow, Typography } from '../../theme';
import { DecorativeEllipses, Card, Button } from '../../components';

import TimeIcon from '../../assets/figma/273eb2bc-49fe-454f-a312-4f561b99e91e.svg';
import SampleIcon from '../../assets/figma/79dcc737-0909-4ac9-9686-f3385385289a.svg';

const FIGMA_TEST_ICON = require('../../assets/figma/00a238a3-331f-4181-aece-230c1dae5a95.png');

const RELATED = [
  { id: '1', name: 'CBC (Complete Blood Count)', tests: 21, price: 319, mrp: 350 },
  { id: '2', name: 'Serum Prolactin', tests: 21, price: 319, mrp: 350 },
  { id: '3', name: 'PSA (Prostrate Specific Antigen) Total', tests: 21, price: 319, mrp: 350 },
  { id: '4', name: 'Serum Calcium', tests: 21, price: 319, mrp: 350 },
];

export default function TestDetailScreen({ navigation }: any) {
  const [expanded, setExpanded] = useState<string | null>('meaning');
  const [cartCount, setCartCount] = useState(0);

  const total = useMemo(() => 1999, []);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.headerBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.greyText} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Full Body Checkup</Text>
        <View style={s.headerBtn} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 160, gap: 16 }}>
        <View style={{ gap: 6 }}>
          <Text style={s.h1}>CBC (Complete Blood Count )</Text>
          <Text style={s.sub}>Also called CRP Test</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Card style={s.statCard}>
            <Text style={s.statLabel}>Earliest reports in</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TimeIcon width={18} height={18} color={Colors.primaryDark} />
              <Text style={s.statValue}>20 hours</Text>
            </View>
          </Card>
          <Card style={s.statCard}>
            <Text style={s.statLabel}>Contains</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <SampleIcon width={18} height={18} color={Colors.primaryDark} />
              <Text style={s.statValue}>21 Tests</Text>
            </View>
          </Card>
        </View>

        <View style={s.priceRow}>
          <Text style={s.priceLabel}>Package price:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
            <Text style={s.price}>₹319.00</Text>
            <Text style={s.mrp}>₹350.00</Text>
            <Text style={s.off}>60% off</Text>
          </View>
        </View>

        <Card style={{ gap: 12 }}>
          <Text style={s.sectionTitle}>Know more about the test</Text>
          <Text style={s.p}>
            Lorem ipsum dolor sit amet consectetur. Duis neque mattis ultricies ornare pellentesque eu at cum. Vitae
            maecenas vitae nam aliquet ipsum, fermentum commodo risus bibendum nunc.
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={s.smallBox}>
              <Text style={s.smallTitle}>Sample required</Text>
              <Text style={s.smallSub}>Blood & Urine</Text>
            </View>
            <View style={s.smallBox}>
              <Text style={s.smallTitle}>Find out</Text>
              <Text style={s.smallSub}>Why is the package booked?</Text>
            </View>
          </View>
        </Card>

        {[
          { id: 'meaning', title: 'What does Full Body Checkup means?', body: 'Lorem ipsum dolor sit amet consectetur. Duis neque mattis ultricies ornare pellentesque eu at cum.' },
          { id: 'serum', title: 'Serum Calcium', body: 'Lorem ipsum dolor sit amet consectetur. Duis neque mattis ultricies ornare pellentesque eu at cum.' },
          { id: 'b12', title: 'Vitamin B12', body: 'Lorem ipsum dolor sit amet consectetur. Duis neque mattis ultricies ornare pellentesque eu at cum.' },
        ].map((acc) => {
          const open = expanded === acc.id;
          return (
            <Card key={acc.id} style={{ padding: 0, overflow: 'hidden' as any }}>
              <TouchableOpacity style={s.accRow} activeOpacity={0.8} onPress={() => setExpanded((p) => (p === acc.id ? null : acc.id))}>
                <Text style={s.accTitle}>{acc.title}</Text>
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

        <View style={{ gap: 12 }}>
          <Text style={s.relatedTitle}>Frequently booked together</Text>
          {RELATED.map((item) => (
            <View key={item.id} style={s.relatedCard}>
              <View style={s.relatedImg}>
                <Image source={FIGMA_TEST_ICON} style={{ width: 40, height: 40 }} resizeMode="contain" />
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={s.relatedName}>{item.name}</Text>
                <Text style={s.relatedSub}>Contains {item.tests} tests</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
                  <Text style={s.relatedPrice}>₹{item.price.toFixed(2)}</Text>
                  <Text style={s.relatedMrp}>/ ₹{item.mrp.toFixed(2)}</Text>
                </View>
              </View>
              <TouchableOpacity style={s.relatedBtn} activeOpacity={0.85} onPress={() => setCartCount((p) => p + 1)}>
                <Text style={s.relatedBtnTxt}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={s.bottomBar}>
        <View style={{ gap: 4 }}>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalPrice}>₹{total.toFixed(2)}</Text>
          <Text style={s.totalNote}>(Inclusive of collection)</Text>
        </View>
        <View style={{ width: 162 }}>
          <Button title="Continue" onPress={() => navigation.navigate('BookSlot')} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  h1: { fontFamily: FontFamily.regular, fontSize: 18, color: '#222' },
  sub: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyNormal },
  statCard: { flex: 1, borderRadius: 12, backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E4E4E7', gap: 10 },
  statLabel: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.greyNormal },
  statValue: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.greyNormal },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceLabel: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },
  price: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  mrp: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal, textDecorationLine: 'line-through' },
  off: { fontFamily: FontFamily.regular, fontSize: 12, color: '#B02832' },
  sectionTitle: { fontFamily: FontFamily.medium, fontSize: 14, color: Colors.primaryDark },
  p: { ...Typography.body2, color: Colors.greyNormal, lineHeight: 18 },
  smallBox: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: '#E4E4E7', backgroundColor: Colors.white, padding: 12, gap: 6 },
  smallTitle: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  smallSub: { fontFamily: FontFamily.regular, fontSize: 10, color: Colors.greyNormal },
  accRow: { paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  accTitle: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark, flex: 1 },
  accBody: { paddingHorizontal: 16, paddingBottom: 14, borderTopWidth: 1, borderTopColor: '#E6E6E6' },
  accText: { ...Typography.body2, color: Colors.greyNormal, marginTop: 10, lineHeight: 18 },
  relatedTitle: { fontFamily: FontFamily.semiBold, fontSize: 18, color: Colors.primaryDark },
  relatedCard: { borderRadius: 20, borderWidth: 1, borderColor: '#E6E6E6', padding: 10, flexDirection: 'row', gap: 10, alignItems: 'center' },
  relatedImg: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#EBF3FA', alignItems: 'center', justifyContent: 'center' },
  relatedName: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.primaryDark },
  relatedSub: { fontFamily: FontFamily.regular, fontSize: 8, color: '#737373' },
  relatedPrice: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primaryDark },
  relatedMrp: { fontFamily: FontFamily.regular, fontSize: 8, color: '#71717A' },
  relatedBtn: { backgroundColor: Colors.primaryDark, borderRadius: 20, height: 25, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  relatedBtnTxt: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.white },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 127, backgroundColor: Colors.white, paddingHorizontal: 17, paddingTop: 16, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...Shadow.lg },
  totalLabel: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.greyNormal },
  totalPrice: { fontFamily: FontFamily.semiBold, fontSize: 20, color: '#1C4A78' },
  totalNote: { fontFamily: FontFamily.regular, fontSize: 12, color: '#B02832' },
});
