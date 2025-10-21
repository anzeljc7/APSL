import React from 'react';
import { Card as TamaguiCard, CardProps as TamaguiCardProps } from 'tamagui';

interface CardProps extends Omit<TamaguiCardProps, 'children'> {
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
  ...props
}) => {
  const getPaddingProps = () => {
    switch (padding) {
      case 'sm':
        return { padding: '$3' };
      case 'md':
        return { padding: '$4' };
      case 'lg':
        return { padding: '$5' };
      default:
        return { padding: '$4' };
    }
  };

  const getShadowProps = () => {
    if (shadow === 'none') return {};
    
    switch (shadow) {
      case 'sm':
        return { 
          shadowColor: '$shadowColor',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        };
      case 'base':
        return { 
          shadowColor: '$shadowColor',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        };
      case 'md':
        return { 
          shadowColor: '$shadowColor',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        };
      case 'lg':
        return { 
          shadowColor: '$shadowColor',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
        };
      default:
        return { 
          shadowColor: '$shadowColor',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        };
    }
  };

  const getVariantProps = () => {
    switch (variant) {
      case 'outlined':
        return { bordered: true };
      case 'elevated':
        return { 
          backgroundColor: '$surface',
          ...getShadowProps(),
        };
      default:
        return { backgroundColor: '$surface' };
    }
  };

  return (
    <TamaguiCard
      {...getPaddingProps()}
      {...getVariantProps()}
      borderRadius="$md"
      {...props}
    >
      {children}
    </TamaguiCard>
  );
};

