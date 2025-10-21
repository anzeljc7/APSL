import { BorderRadius, Colors, Fonts, Shadows } from '@/constants/theme';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : {},
    isDisabled ? styles.disabled : {},
    style,
  ].filter(Boolean);

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : Colors.brand.primary}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={textStyle}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.brand.primary,
  },
  secondary: {
    backgroundColor: Colors.brand.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.brand.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    fontWeight: Fonts.fontWeight.semibold,
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: Colors.brand.primary,
  },
  ghostText: {
    color: Colors.brand.primary,
  },
  disabledText: {
    opacity: 0.7,
  },
  
  // Text sizes
  smText: {
    fontSize: Fonts.fontSize.sm,
  },
  mdText: {
    fontSize: Fonts.fontSize.base,
  },
  lgText: {
    fontSize: Fonts.fontSize.lg,
  },
});
