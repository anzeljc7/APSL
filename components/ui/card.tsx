import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'base',
  variant = 'default',
  style,
  ...props
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof styles],
    shadow !== 'none' && styles[`shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}` as keyof typeof styles],
    style,
  ].filter(Boolean);

  if (props.onPress) {
    return (
      <TouchableOpacity style={cardStyle} activeOpacity={0.95} {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.surface,
  },
  
  // Variants
  default: {
    backgroundColor: Colors.light.surface,
  },
  outlined: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  elevated: {
    backgroundColor: Colors.light.surface,
  },
  
  // Padding variants
  paddingSm: {
    padding: 12,
  },
  paddingMd: {
    padding: 16,
  },
  paddingLg: {
    padding: 20,
  },
  
  // Shadow variants
  shadowSm: {
    ...Shadows.sm,
  },
  shadowBase: {
    ...Shadows.base,
  },
  shadowMd: {
    ...Shadows.md,
  },
  shadowLg: {
    ...Shadows.lg,
  },
});
