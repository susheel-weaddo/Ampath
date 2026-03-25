import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, containerSpace, FontFamily } from '../../theme';
import { DecorativeEllipses, PlainHeader } from '../../components';

import IconEditSquare from '../../assets/icons/icon-edit-square.svg';
import IconChevronRight from '../../assets/icons/icon-chevron-right.svg';

import IconFamily from '../../assets/icons/icon-family.svg';
import IconReminder from '../../assets/icons/icon-reminder.svg';
import IconBookings from '../../assets/icons/icon-bookings.svg';
import IconAddress from '../../assets/icons/icon-address.svg';

import IconBell from '../../assets/icons/icon-bell.svg';
import IconLock from '../../assets/icons/icon-lock.svg';
import IconGlobal from '../../assets/icons/icon-global.svg';
import IconDisplayModes from '../../assets/icons/icon-display-modes.svg';

import IconHelp from '../../assets/icons/icon-help.svg';
import IconLogout from '../../assets/icons/icon-logout.svg';

const AVATAR_ABHINAV = require('../../assets/figma/c9226a91-9796-436c-8c92-171a7ad3fc84.png');

type MenuItem = {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
  rightText?: string;
};

function MenuCard({ items }: { items: MenuItem[] }) {
  return (
    <View style={s.card}>
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.7}
            onPress={item.onPress}
            style={[s.item, idx < items.length - 1 && s.itemDivider]}
          >
            <View style={s.itemLeft}>
              <Icon width={24} height={24} color={Colors.grayTer}  preserveAspectRatio="xMidYMid meet" />
              <Text style={s.itemLabel}>{item.label}</Text>
            </View>
            <View style={s.itemRight}>
              {item.rightText ? <Text style={s.itemRightText}>{item.rightText}</Text> : <IconChevronRight width={14} height={14} color={Colors.primaryDark}  preserveAspectRatio="xMidYMid meet" />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ProfileScreen({ navigation }: any) {
  const showBack = typeof navigation?.canGoBack === 'function' ? navigation.canGoBack() : true;

  const cards = useMemo(() => {
    const go = (name: string) => () => navigation.navigate(name);
    return {
      top: [
        { key: 'family', label: 'Family Members', icon: IconFamily, onPress: go('FamilyMembers') },
        { key: 'reminder', label: 'Set Reminder', icon: IconReminder, onPress: go('SetReminder') },
        { key: 'bookings', label: 'My Bookings', icon: IconBookings, onPress: () => navigation.navigate('Bookings') },
        { key: 'addresses', label: 'Manage Addresses', icon: IconAddress, onPress: go('SavedAddresses') },
      ] satisfies MenuItem[],
      mid: [
        { key: 'notifications', label: 'Notifications', icon: IconBell, onPress: go('Notifications') },
        { key: 'security', label: 'Account and Security', icon: IconLock, onPress: go('AccountSecurity') },
        { key: 'payment', label: 'Payment Settings', icon: IconGlobal, onPress: go('PaymentSettings') },
        { key: 'language', label: 'Language', icon: IconGlobal, onPress: go('LanguageSettings') },
        { key: 'display', label: 'Display Modes', icon: IconDisplayModes, onPress: go('Appearance') },
      ] satisfies MenuItem[],
      bottom: [
        { key: 'help', label: 'Help & Feedback', icon: IconHelp, onPress: go('GetHelp') },
        { key: 'privacy', label: 'Privacy & Policy', icon: IconLock, onPress: go('PrivacyPolicy') },
        { key: 'rate', label: 'Rate Us', icon: IconGlobal, onPress: () => {} },
        { key: 'logout', label: 'Logout', icon: IconLogout, onPress: () => {}, rightText: '1.5.0' },
      ] satisfies MenuItem[],
    };
  }, [navigation]);

  return (
    <View style={s.container}>
      <StatusBar style="dark" />
      <DecorativeEllipses />

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <PlainHeader title="Profile" showBack={showBack} onBack={() => navigation.goBack()} />

        <View style={s.userRow}>
          <View style={s.userLeft}>
            <Image source={AVATAR_ABHINAV} style={s.userAvatar} />
            <View style={{ gap: 2 }}>
              <Text style={s.userName}>Abhinav</Text>
              <Text style={s.userEmail}>abhinav@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate('EditProfile')} style={s.editBtn}>
            <IconEditSquare width={20} height={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <MenuCard items={cards.top} />
        <MenuCard items={cards.mid} />
        <MenuCard items={cards.bottom} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingBottom: 120 },
  userRow: { marginTop: 12, marginHorizontal: containerSpace, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  userLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  userAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F4F4F5' },
  userName: { fontFamily: FontFamily.medium, fontSize: 16, color: Colors.primaryDark },
  userEmail: { fontFamily: FontFamily.regular, fontSize: 12, color: '#737373' },
  editBtn: { width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  card: { marginTop: 16, marginHorizontal: 16, backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: '#E6E6E6', overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16 },
  itemDivider: { borderBottomWidth: 1, borderBottomColor: '#E6E6E6' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  itemLabel: { fontFamily: FontFamily.regular, fontSize: 14, color: Colors.primaryDark },
  itemRight: { minWidth: 24, alignItems: 'flex-end' },
  itemRightText: { fontFamily: FontFamily.medium, fontSize: 12, color: Colors.primary, letterSpacing: 0.2 },
});
