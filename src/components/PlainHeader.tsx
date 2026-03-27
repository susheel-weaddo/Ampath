import React, { ReactNode } from 'react';
import { Platform, StatusBar as RNStatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily } from '../theme';
import ChevronLeft from '../assets/icons/icon-chevron-left.svg';

type PlainHeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
};

export function PlainHeader({ title, showBack = true, onBack, rightElement }: PlainHeaderProps) {
  return (
    <View style={s.wrap}>
      <View style={s.row}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={s.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ChevronLeft width={24} height={24} color={Colors.primary} />
          </TouchableOpacity>
        ) : <View style={s.backBtn} />}
        <Text style={s.title}>{title}</Text>
        <View style={s.right}>
          {rightElement || null}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingTop: Platform.OS === 'ios' ? 56 : (RNStatusBar.currentHeight || 44) + 12, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontFamily: FontFamily.medium, fontSize: 16, color: Colors.greyText },
  right: { minWidth: 34, height: 34, alignItems: 'flex-end', justifyContent: 'center' },
});
