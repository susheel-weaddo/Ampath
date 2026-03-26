import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';
import ChevronRight from '../../assets/icons/icon-chevron-right.svg';

type Item = {
  key: string;
  title: string;
  body?: string;
};

const DATA: Item[] = [
  {
    key: 'service',
    title: 'The service we offer',
    body:
      'Lorem ipsum dolor sit amet consectetur. Dui neque mattis ultricies ornare pellentesque eu urna ut auctor. Vitae maecenas vitae nam aliquet ipsum. Fermentum commodo risus bibendum nunc pharetra aliquam.',
  },
  { key: 'access', title: 'Access medical & Health Info' },
  { key: 'order_meds', title: 'Order medicines online' },
  { key: 'lab_tests', title: 'Book lab tests' },
  { key: 'consult', title: 'Online Consultation' },
];

export default function GuideToAmpathScreen({ navigation }: any) {
  const [openKey, setOpenKey] = useState<string>('service');
  const open = useMemo(() => new Set([openKey]), [openKey]);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="A guide to Ampath" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {DATA.map((item, idx) => {
          const isOpen = open.has(item.key);
          return (
            <View key={item.key} style={idx === 0 ? { marginBottom: 10 } : undefined}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setOpenKey((prev) => (prev === item.key ? '' : item.key))} style={s.row}>
                <Text style={[s.rowTitle, isOpen && { color: Colors.primaryDark, fontFamily: FontFamily.medium }]}>{item.title}</Text>
                <View style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}>
                  <ChevronRight width={18} height={18} color={Colors.primaryDark} preserveAspectRatio="xMidYMid meet" />
                </View>
              </TouchableOpacity>

              {isOpen && item.body ? <Text style={s.body}>{item.body}</Text> : null}
              <View style={s.hr} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 28, paddingHorizontal: 17, paddingBottom: 120 },
  row: { height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  rowTitle: { fontFamily: FontFamily.regular, fontSize: 14, color: '#595959' },
  body: { marginTop: 10, fontFamily: FontFamily.regular, fontSize: 12, color: '#737373', lineHeight: 14.4 },
  hr: { marginTop: 12, height: 1, backgroundColor: '#D4D4D8' },
});

