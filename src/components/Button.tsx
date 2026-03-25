// ─── Button.tsx ───
import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator,
  ViewStyle, TextStyle,
} from 'react-native';
import { Colors, FontFamily, FontSize, BorderRadius, Spacing } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  title, onPress, variant = 'primary', loading = false,
  disabled = false, style, textStyle, fullWidth = true, size = 'lg',
}) => {
  const isDisabled = disabled || loading;
  const padV = size === 'sm' ? 8 : size === 'md' ? 11 : 14;
  return (
    <TouchableOpacity
      onPress={onPress} disabled={isDisabled} activeOpacity={0.8}
      style={[
        s.base, { paddingVertical: padV },
        variant === 'primary' && s.primary,
        variant === 'outline' && s.outline,
        variant === 'ghost' && s.ghost,
        fullWidth && { width: '100%' as any },
        isDisabled && { opacity: 0.5 },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : Colors.primary} size="small" />
      ) : (
        <Text style={[
          s.text,
          variant === 'outline' && { color: Colors.primary },
          variant === 'ghost' && { color: Colors.primary },
          size === 'sm' && { fontSize: 12 },
          textStyle,
        ]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', borderRadius: BorderRadius.pill, paddingHorizontal: Spacing.base },
  primary: { backgroundColor: Colors.primary },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary },
  ghost: { backgroundColor: 'transparent' },
  text: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: '#fff', textAlign: 'center' },
});
