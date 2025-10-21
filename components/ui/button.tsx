import React from 'react';
import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps } from 'tamagui';

interface ButtonProps extends Omit<TamaguiButtonProps, 'children' | 'variant'> {
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
  ...props
}) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '$primary' };
      case 'secondary':
        return { backgroundColor: '$secondary' };
      case 'outline':
        return { bordered: true, backgroundColor: 'transparent', borderColor: '$primary' };
      case 'ghost':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: '$primary' };
    }
  };

  const getSizeProps = () => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: '$3', paddingVertical: '$2' };
      case 'md':
        return { paddingHorizontal: '$4', paddingVertical: '$3' };
      case 'lg':
        return { paddingHorizontal: '$5', paddingVertical: '$4' };
      default:
        return { paddingHorizontal: '$4', paddingVertical: '$3' };
    }
  };

  return (
    <TamaguiButton
      {...getVariantProps()}
      {...getSizeProps()}
      disabled={disabled || loading}
      width={fullWidth ? '100%' : undefined}
      opacity={disabled || loading ? 0.5 : 1}
      borderRadius="$md"
      {...props}
    >
      {loading ? (
        <TamaguiButton.Text>Loading...</TamaguiButton.Text>
      ) : (
        <>
          {leftIcon && leftIcon}
          <TamaguiButton.Text color={variant === 'outline' || variant === 'ghost' ? '$primary' : '$white'}>
            {title}
          </TamaguiButton.Text>
          {rightIcon && rightIcon}
        </>
      )}
    </TamaguiButton>
  );
};

