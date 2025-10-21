/**
 * Comprehensive theme system for Flik Pay
 * Supports light and dark modes with consistent design tokens
 */

import { Platform } from 'react-native';

// Brand colors
const brandColors = {
  primary: '#007AFF',
  primaryDark: '#0056CC',
  secondary: '#5856D6',
  accent: '#FF9500',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
} as const;

// Neutral colors
const neutralColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

// Light theme colors
const lightColors = {
  // Background colors
  background: '#F2F2F7',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8F9FA',
  
  // Text colors
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#8E8E93',
  textInverse: '#FFFFFF',
  
  // Border colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  // Interactive colors
  tint: brandColors.primary,
  tabIconDefault: '#8E8E93',
  tabIconSelected: brandColors.primary,
  
  // Status colors
  success: brandColors.success,
  warning: brandColors.warning,
  error: brandColors.error,
  info: brandColors.info,
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
} as const;

// Dark theme colors
const darkColors = {
  // Background colors
  background: '#000000',
  surface: '#1C1C1E',
  surfaceSecondary: '#2C2C2E',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#8E8E93',
  textInverse: '#000000',
  
  // Border colors
  border: '#38383A',
  borderLight: '#2C2C2E',
  
  // Interactive colors
  tint: '#FFFFFF',
  tabIconDefault: '#8E8E93',
  tabIconSelected: '#FFFFFF',
  
  // Status colors
  success: brandColors.success,
  warning: brandColors.warning,
  error: brandColors.error,
  info: brandColors.info,
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowLight: 'rgba(0, 0, 0, 0.2)',
} as const;

// Typography system
const typography = {
  fontFamily: Platform.select({
    ios: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    android: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      semibold: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
    default: {
      regular: 'system-ui',
      medium: 'system-ui',
      semibold: 'system-ui',
      bold: 'system-ui',
    },
  }),
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Spacing system
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// Border radius system
const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

// Shadow system
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Animation durations
const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
} as const;

// Export theme objects
export const Colors = {
  brand: brandColors,
  neutral: neutralColors,
  light: lightColors,
  dark: darkColors,
} as const;

export const Fonts = typography;
export const Spacing = spacing;
export const BorderRadius = borderRadius;
export const Shadows = shadows;
export const Animation = animation;

// Theme type for TypeScript
export type Theme = {
  colors: typeof lightColors | typeof darkColors;
  fonts: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  animation: typeof animation;
};

// Helper function to get theme colors
export const getThemeColors = (isDark: boolean) => ({
  colors: isDark ? darkColors : lightColors,
  fonts: typography,
  spacing,
  borderRadius,
  shadows,
  animation,
});

// Legacy export for backward compatibility
export { darkColors as dark, lightColors as light };
