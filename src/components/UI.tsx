import React, { ReactNode } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ViewStyle, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily, FontSize, BorderRadius, Spacing, Shadow, Typography } from '../theme';
const VectorAImage = require('../assets/figma/vector-a.png');

// ─── Screen Header (Blue curved) ───
interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
  children?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, rightElement, children }) => (
  <View style={hs.header}>
    <View style={hs.row}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} style={hs.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
      ) : <View style={{ width: 40 }} />}
      <Text style={hs.title}>{title}</Text>
      {rightElement || <View style={{ width: 40 }} />}
    </View>
    {children}
  </View>
);

const hs = StyleSheet.create({
  header: { backgroundColor: Colors.primary, paddingTop: Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight || 44) + 12, paddingHorizontal: Spacing.base, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  title: { fontFamily: FontFamily.semiBold, fontSize: FontSize.h2, color: '#fff', textAlign: 'center', flex: 1 },
});

// ─── Search Bar ───
interface SearchBarProps {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  onClear?: () => void;
  variant?: 'light' | 'dark';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value, onChangeText, placeholder = 'Search...', onClear, variant = 'light',
}) => (
  <View style={[sb.container, variant === 'dark' && { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
    <Ionicons name="search" size={16} color={variant === 'dark' ? 'rgba(255,255,255,0.85)' : Colors.greyNormal} />
    <TextInput
      style={[sb.input, variant === 'dark' && { color: '#fff' }]}
      placeholder={placeholder}
      placeholderTextColor={variant === 'dark' ? 'rgba(255,255,255,0.5)' : Colors.greyLight}
      value={value} onChangeText={onChangeText}
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => { onChangeText(''); onClear?.(); }}>
        <Ionicons name="close" size={16} color={variant === 'dark' ? 'rgba(255,255,255,0.7)' : Colors.greyNormal} />
      </TouchableOpacity>
    )}
  </View>
);

const sb = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: BorderRadius.md, paddingHorizontal: 14, height: 44, gap: 10 },
  input: { flex: 1, fontFamily: FontFamily.regular, fontSize: FontSize.body2, color: Colors.greyText, padding: 0 },
});

// ─── Filter Pill Row ───
interface FilterPillsProps {
  filters: string[];
  active: string;
  onSelect: (f: string) => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({ filters = [], active, onSelect }) => (
  <View style={{ flexDirection: 'row', gap: 8 }}>
    {filters.map(f => (
      <TouchableOpacity
        key={f}
        onPress={() => onSelect(f)}
        style={[fp.pill, active === f && fp.pillActive]}>
        <Text style={[fp.text, active === f && fp.textActive]}>{f}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const fp = StyleSheet.create({
  pill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: BorderRadius.pill, backgroundColor: 'rgba(255,255,255,0.15)' },
  pillActive: { backgroundColor: '#fff' },
  text: { fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color: 'rgba(255,255,255,0.8)' },
  textActive: { color: Colors.primary },
});

// ─── Badge ───
export const Badge: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <View style={{ backgroundColor: color + '1A', paddingVertical: 3, paddingHorizontal: 10, borderRadius: BorderRadius.pill }}>
    <Text style={{ fontFamily: FontFamily.medium, fontSize: FontSize.caption1, color }}>{label}</Text>
  </View>
);

// ─── Section Title ───
export const SectionTitle: React.FC<{ title: string; onViewAll?: () => void }> = ({ title, onViewAll }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.base, marginBottom: 14 }}>
    <Text style={{ fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: Colors.greyText }}>{title}</Text>
    {onViewAll && <TouchableOpacity onPress={onViewAll}><Text style={{ fontFamily: FontFamily.medium, fontSize: FontSize.body2, color: Colors.primary }}>View All</Text></TouchableOpacity>}
  </View>
);

// ─── Card Wrapper ───
export const Card: React.FC<{ style?: ViewStyle; children: ReactNode; onPress?: () => void }> = ({ style, children, onPress }) => {
  const Comp: any = onPress ? TouchableOpacity : View;
  return (
    <Comp onPress={onPress} activeOpacity={0.7} style={[{ backgroundColor: '#fff', borderRadius: BorderRadius.lg, padding: 16, ...Shadow.sm }, style]}>
      {children}
    </Comp>
  );
};

// ─── Decorative Ellipses (from Figma splash/login/OTP) ───
export const DecorativeEllipses: React.FC = () => (
  <>
    <View>
      <Image
        source={VectorAImage}
        style={tr.bg}
        resizeMode="contain"
      />
    </View>
  </>
);

// ─── AMPATH Logo Block ───
export const LogoBlock: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sz = size === 'sm' ? 22 : size === 'lg' ? 34 : 28;
  const fsz = size === 'sm' ? 18 : size === 'lg' ? 30 : 24;
  const sub = size === 'sm' ? 8 : size === 'lg' ? 11 : 9;
  return (
    <View style={{ alignItems: 'center', gap: 3 }}>
      <Text style={{ fontSize: sz }}>🧬</Text>
      <Text style={{ fontFamily: FontFamily.bold, fontSize: fsz, color: Colors.brand, letterSpacing: 2 }}>AMPATH</Text>
      {size !== 'sm' && <Text style={{ fontFamily: FontFamily.regular, fontSize: sub, color: Colors.greyNormal, letterSpacing: 0.3 }}>Trusted Pathology. Global Standards.</Text>}
    </View>
  );
};

// ─── Tab Separator ───
interface TabRowProps {
  tabs: string[];
  active: string;
  onSelect: (t: string) => void;
}

export const TabRow: React.FC<TabRowProps> = ({ tabs = [], active, onSelect }) => (
  <View style={{ flexDirection: 'row' }}>
    {tabs.map(t => (
      <TouchableOpacity key={t} onPress={() => onSelect(t)} style={[tr.tab, active === t && tr.tabActive]}>
        <Text style={[tr.text, active === t && tr.textActive]}>{t}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const tr = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 15,
    left: 0,
    width: "52%",
    aspectRatio: 247/374,
    zIndex: 0,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: '#fff' },
  text: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: 'rgba(255,255,255,0.6)' },
  textActive: { color: '#fff' },
});
