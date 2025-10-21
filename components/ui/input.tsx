import React from 'react';
import { Label, Input as TamaguiInput, InputProps as TamaguiInputProps, XStack, YStack } from 'tamagui';

interface InputProps extends Omit<TamaguiInputProps, 'children'> {
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
  ...props
}) => {
  const hasError = !!error;

  return (
    <YStack space="$2" {...containerStyle}>
      {label && (
        <Label htmlFor={props.id} fontSize="$3" fontWeight="500" color="$color">
          {label}
        </Label>
      )}
      
      <XStack
        alignItems="center"
        backgroundColor="$surface"
        borderWidth={1}
        borderColor={hasError ? '$error' : '$borderColor'}
        borderRadius="$md"
        paddingHorizontal="$4"
        paddingVertical="$3"
        space="$2"
      >
        {leftIcon && (
          <YStack alignItems="center" justifyContent="center">
            {leftIcon}
          </YStack>
        )}
        
        <TamaguiInput
          flex={1}
          borderWidth={0}
          backgroundColor="transparent"
          fontSize="$4"
          color="$color"
          placeholderTextColor="$colorTertiary"
          {...props}
        />
        
        {rightIcon && (
          <YStack alignItems="center" justifyContent="center">
            {rightIcon}
          </YStack>
        )}
      </XStack>
      
      {(error || helperText) && (
        <Label fontSize="$3" color={hasError ? '$error' : '$colorSecondary'}>
          {error || helperText}
        </Label>
      )}
    </YStack>
  );
};

