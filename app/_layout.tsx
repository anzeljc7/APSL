import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ErrorBoundary } from '@/components/error-boundary';
import { AppProvider } from '@/contexts/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ErrorBoundary>
      <AppProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="pin-setup" options={{ headerShown: false }} />
            <Stack.Screen name="send-money" options={{ headerShown: false }} />
            <Stack.Screen name="qr-payment" options={{ headerShown: false }} />
            <Stack.Screen name="groups" options={{ headerShown: false }} />
            <Stack.Screen name="group/[groupId]" options={{ headerShown: false }} />
            <Stack.Screen name="add-expense" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="change-pin" options={{ headerShown: false }} />
            <Stack.Screen name="language" options={{ headerShown: false }} />
            <Stack.Screen name="payment-limits" options={{ headerShown: false }} />
            <Stack.Screen name="2fa" options={{ headerShown: false }} />
            <Stack.Screen name="terms" options={{ headerShown: false }} />
            <Stack.Screen name="help" options={{ headerShown: false }} />
            <Stack.Screen name="contact" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
