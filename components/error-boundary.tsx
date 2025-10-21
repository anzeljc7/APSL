import { IconSymbol } from '@/components/ui/icon-symbol';
import { BorderRadius, Colors, Fonts, Shadows, Spacing } from '@/constants/theme';
import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to crash reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you would send this to a crash reporting service
    if (__DEV__) {
      console.log('Error Info:', errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.errorCard}>
            <IconSymbol 
              name="exclamationmark.triangle.fill" 
              size={48} 
              color={Colors.brand.error} 
            />
            
            <Text style={styles.title}>Something went wrong</Text>
            
            <Text style={styles.message}>
              We're sorry, but something unexpected happened. Please try again.
            </Text>
            
            {__DEV__ && this.state.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorTitle}>Error Details:</Text>
                <Text style={styles.errorText}>{this.state.error.message}</Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing[6],
  },
  errorCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing[8],
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
    ...Shadows.md,
  },
  title: {
    fontSize: Fonts.fontSize['2xl'],
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.light.text,
    marginTop: Spacing[4],
    marginBottom: Spacing[2],
    textAlign: 'center',
  },
  message: {
    fontSize: Fonts.fontSize.base,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: Fonts.lineHeight.relaxed * Fonts.fontSize.base,
    marginBottom: Spacing[6],
  },
  errorDetails: {
    backgroundColor: Colors.light.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing[4],
    marginBottom: Spacing[6],
    width: '100%',
  },
  errorTitle: {
    fontSize: Fonts.fontSize.sm,
    fontWeight: Fonts.fontWeight.semibold,
    color: Colors.brand.error,
    marginBottom: Spacing[2],
  },
  errorText: {
    fontSize: Fonts.fontSize.sm,
    color: Colors.light.textSecondary,
    fontFamily: 'monospace',
  },
  retryButton: {
    backgroundColor: Colors.brand.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[3],
  },
  retryButtonText: {
    color: Colors.neutral.white,
    fontSize: Fonts.fontSize.base,
    fontWeight: Fonts.fontWeight.semibold,
  },
});
