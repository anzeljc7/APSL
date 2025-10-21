import { BorderRadius, Colors, Fonts, Shadows } from '@/constants/theme';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  const hasError = !!error;
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        hasError && styles.inputContainerError,
        hasLeftIcon && styles.inputContainerWithLeftIcon,
        hasRightIcon && styles.inputContainerWithRightIcon,
      ]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            hasLeftIcon && styles.inputWithLeftIcon,
            hasRightIcon && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={Colors.light.textTertiary}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={[styles.helperText, hasError && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: Fonts.fontSize.sm,
    fontWeight: Fonts.fontWeight.medium,
    color: Colors.light.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  inputContainerError: {
    borderColor: Colors.brand.error,
  },
  inputContainerWithLeftIcon: {
    paddingLeft: 0,
  },
  inputContainerWithRightIcon: {
    paddingRight: 0,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: Fonts.fontSize.base,
    color: Colors.light.text,
    backgroundColor: 'transparent',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIconContainer: {
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    paddingRight: 16,
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    fontSize: Fonts.fontSize.sm,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  errorText: {
    color: Colors.brand.error,
  },
});
