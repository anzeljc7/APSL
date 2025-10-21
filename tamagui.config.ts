import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      // Brand colors
      primary: '#007AFF',
      primaryDark: '#0056CC',
      secondary: '#5856D6',
      accent: '#FF9500',
      
      // Background colors
      background: '#F2F2F7',
      backgroundHover: '#F8F9FA',
      backgroundPress: '#E5E7EB',
      backgroundFocus: '#F3F4F6',
      backgroundStrong: '#FFFFFF',
      backgroundTransparent: 'transparent',
      
      // Surface colors
      surface: '#FFFFFF',
      surfaceSecondary: '#F8F9FA',
      surfaceHover: '#F3F4F6',
      surfacePress: '#E5E7EB',
      surfaceFocus: '#F9FAFB',
      
      // Text colors
      color: '#000000',
      colorHover: '#374151',
      colorPress: '#111827',
      colorFocus: '#4B5563',
      colorTransparent: 'transparent',
      
      // Text variants
      colorSecondary: '#666666',
      colorTertiary: '#8E8E93',
      colorInverse: '#FFFFFF',
      
      // Border colors
      borderColor: '#E0E0E0',
      borderColorHover: '#D1D5DB',
      borderColorPress: '#9CA3AF',
      borderColorFocus: '#6B7280',
      
      // Interactive colors
      tint: '#007AFF',
      tabIconDefault: '#8E8E93',
      tabIconSelected: '#007AFF',
      
      // Status colors
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#007AFF',
      
      // Shadow colors
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowColorLight: 'rgba(0, 0, 0, 0.05)',
    },
    dark: {
      ...config.themes.dark,
      // Brand colors
      primary: '#007AFF',
      primaryDark: '#0056CC',
      secondary: '#5856D6',
      accent: '#FF9500',
      
      // Background colors
      background: '#000000',
      backgroundHover: '#1C1C1E',
      backgroundPress: '#2C2C2E',
      backgroundFocus: '#1F2937',
      backgroundStrong: '#1C1C1E',
      backgroundTransparent: 'transparent',
      
      // Surface colors
      surface: '#1C1C1E',
      surfaceSecondary: '#2C2C2E',
      surfaceHover: '#374151',
      surfacePress: '#4B5563',
      surfaceFocus: '#6B7280',
      
      // Text colors
      color: '#FFFFFF',
      colorHover: '#EBEBF5',
      colorPress: '#F3F4F6',
      colorFocus: '#D1D5DB',
      colorTransparent: 'transparent',
      
      // Text variants
      colorSecondary: '#EBEBF5',
      colorTertiary: '#8E8E93',
      colorInverse: '#000000',
      
      // Border colors
      borderColor: '#38383A',
      borderColorHover: '#4B5563',
      borderColorPress: '#6B7280',
      borderColorFocus: '#9CA3AF',
      
      // Interactive colors
      tint: '#FFFFFF',
      tabIconDefault: '#8E8E93',
      tabIconSelected: '#FFFFFF',
      
      // Status colors
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#007AFF',
      
      // Shadow colors
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowColorLight: 'rgba(0, 0, 0, 0.2)',
    },
  },
  tokens: {
    ...config.tokens,
    space: {
      ...config.tokens.space,
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
    },
    radius: {
      ...config.tokens.radius,
      none: 0,
      sm: 4,
      base: 8,
      md: 12,
      lg: 16,
      xl: 20,
      '2xl': 24,
      full: 9999,
    },
    zIndex: {
      ...config.tokens.zIndex,
      sm: 1,
      base: 2,
      md: 4,
      lg: 8,
      xl: 16,
    },
  },
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
