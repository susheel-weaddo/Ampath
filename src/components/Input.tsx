import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors, FontFamily, FontSize, BorderRadius, Spacing, Typography } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label, error, containerStyle, style, onFocus, onBlur, ...rest
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[{ width: '100%' as any, gap: Spacing.base }, containerStyle]}>
      {label && <Text style={{ fontFamily: FontFamily.medium, fontSize: FontSize.body1, color: Colors.greyText }}>{label}</Text>}
      <TextInput
        style={[
          s.input,
          focused && { borderColor: Colors.primary, borderWidth: 1.5 },
          error ? { borderColor: Colors.error } : null,
          style,
        ]}
        placeholderTextColor={Colors.greyLight}
        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        {...rest}
      />
      {error ? <Text style={{ fontFamily: FontFamily.regular, fontSize: FontSize.caption1, color: Colors.error, marginTop: 4 }}>{error}</Text> : null}
    </View>
  );
};

const s = StyleSheet.create({
  input: {
    height: 45, borderWidth: 1, borderColor: Colors.greyLight,
    borderRadius: BorderRadius.md, paddingHorizontal: 15,
    fontFamily: FontFamily.regular, fontSize: FontSize.body1,
    color: Colors.greyText, backgroundColor: Colors.white,
  },
});
