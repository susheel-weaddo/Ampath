import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DecorativeEllipses, PlainHeader } from '../../components';
import { Colors, FontFamily } from '../../theme';

import IconEdit from '../../assets/icons/icon-address-edit.svg';
import IconRemove from '../../assets/icons/icon-address-remove.svg';

type Address = {
  id: string;
  label: string;
  address: string;
  phone: string;
};

const ADDRESSES: Address[] = [
  {
    id: 'home',
    label: 'Home',
    address: '1408/A2 street no. 13, 4th t is a long established fact that a reader will be distracted by - 110019, Delhi',
    phone: '+91 - 9619XXXXX',
  },
  {
    id: 'apt',
    label: 'Apartments',
    address: '1408/A2 street no. 13, 4th t is a long established fact that a reader will be distracted by - 110019, Delhi',
    phone: '+91 - 9619XXXXX',
  },
];

function ActionPill({
  label,
  icon,
  onPress,
  iconColor,
}: {
  label: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
  iconColor: string;
}) {
  const Icon = icon;
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={s.pillBtn}>
      <Text style={s.pillBtnText}>{label}</Text>
      <Icon width={14} height={14} color={iconColor} />
    </TouchableOpacity>
  );
}

export default function SavedAddressesScreen({ navigation }: any) {
  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />
      <PlainHeader title="Manage Addresses" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {ADDRESSES.map((addr) => (
          <View key={addr.id} style={s.card}>
            <Text style={s.cardTitle}>{addr.label}</Text>
            <View style={{ gap: 20 }}>
              <Text style={s.cardBody}>{addr.address}</Text>
              <Text style={s.cardPhone}>{addr.phone}</Text>
            </View>

            <View style={s.actionsRow}>
              <ActionPill label="Edit" icon={IconEdit} iconColor={Colors.primaryDark} onPress={() => {}} />
              <ActionPill label="Remove" icon={IconRemove} iconColor="#B02832" onPress={() => {}} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingTop: 11, paddingHorizontal: 16, paddingBottom: 120, gap: 25 },

  card: { backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,92,162,0.5)', padding: 15, gap: 15 },
  cardTitle: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  cardBody: { fontFamily: FontFamily.regular, fontSize: 14, color: '#494949', lineHeight: 16.8 },
  cardPhone: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.black },

  actionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 10, height: 29 },
  pillBtn: { flex: 1, height: 29, borderRadius: 30, backgroundColor: '#F3F8FF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: 10 },
  pillBtnText: { fontFamily: FontFamily.regular, fontSize: 12, color: Colors.black },
});

