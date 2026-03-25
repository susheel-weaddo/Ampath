import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const FontSize = {
  caption2: 8, caption1: 10, body2: 12, body1: 14, h3: 18, h2: 22, h1: 28,
} as const;

export const LineHeight = {
  caption1: 12, body2: 14.4, body1: 16.8, h3: 21.6, h2: 26.4, h1: 33.6,
} as const;

export const Typography: Record<string, TextStyle> = {
  h1: { fontFamily: FontFamily.bold, fontSize: FontSize.h1, lineHeight: LineHeight.h1 },
  h2: { fontFamily: FontFamily.semiBold, fontSize: FontSize.h2, lineHeight: LineHeight.h2 },
  h3: { fontFamily: FontFamily.semiBold, fontSize: FontSize.h3, lineHeight: LineHeight.h3 },
  body1Medium: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, lineHeight: LineHeight.body1 },
  body1: { fontFamily: FontFamily.regular, fontSize: FontSize.body1, lineHeight: LineHeight.body1 },
  body2: { fontFamily: FontFamily.regular, fontSize: FontSize.body2, lineHeight: LineHeight.body2 },
  caption1: { fontFamily: FontFamily.regular, fontSize: FontSize.caption1, lineHeight: LineHeight.caption1 },
  button: { fontFamily: FontFamily.medium, fontSize: FontSize.body1, lineHeight: LineHeight.body1, textAlign: 'center' },
};
