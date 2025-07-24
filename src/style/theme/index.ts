import { colors } from '@/style/theme/color';
import { typography } from '@/style/theme/typography';

export const theme = {
  colors,
  typography,
} as const;

export type ThemeType = typeof theme;
export type ColorTypes = typeof colors;
export type TypographyTypes = typeof typography;
