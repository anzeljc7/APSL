import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, H2, H3, Text, XStack, YStack } from 'tamagui';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { logout } = useApp();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to permanently delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement, 
    destructive = false 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    destructive?: boolean;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
    >
      <Card
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="$surface"
        paddingHorizontal="$6"
        paddingVertical="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderLight"
      >
        <XStack alignItems="center" flex={1}>
          <YStack
            width={32}
            height={32}
            borderRadius={16}
            backgroundColor={destructive ? '$error' : '$borderLight'}
            justifyContent="center"
            alignItems="center"
            marginRight="$3"
          >
            <IconSymbol name={icon as any} size={20} color={destructive ? '#FF3B30' : '#007AFF'} />
          </YStack>
          <YStack flex={1}>
            <Text fontSize="$4" fontWeight="500" color={destructive ? '$error' : '$color'} marginBottom="$1">
              {title}
            </Text>
            {subtitle && (
              <Text fontSize="$3" color="$colorTertiary">
                {subtitle}
              </Text>
            )}
          </YStack>
        </XStack>
        {rightElement || (
          onPress && <IconSymbol name="chevron.right" size={16} color="#8E8E93" />
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '$background' }}>
      <YStack paddingHorizontal="$6" paddingTop="$5" paddingBottom="$4">
        <H2 fontWeight="bold" color="$color">
          Settings
        </H2>
      </YStack>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <YStack marginBottom="$8">
          <H3 fontSize="$4" fontWeight="600" color="$colorTertiary" marginBottom="$2" paddingHorizontal="$6" textTransform="uppercase" letterSpacing={0.5}>
            Profile
          </H3>
          <SettingItem
            icon="person.circle"
            title="Personal Information"
            subtitle="Update your contact details"
            onPress={() => router.push('/profile')}
          />
          <SettingItem
            icon="key"
            title="Change PIN"
            subtitle="Update your security PIN"
            onPress={() => router.push('/change-pin')}
          />
          <SettingItem
            icon="touchid"
            title="Biometric Login"
            subtitle="Use fingerprint or face ID"
            rightElement={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '$borderColor', true: '$primary' }}
                thumbColor="$white"
              />
            }
          />
        </YStack>

        {/* Preferences Section */}
        <YStack marginBottom="$8">
          <H3 fontSize="$4" fontWeight="600" color="$colorTertiary" marginBottom="$2" paddingHorizontal="$6" textTransform="uppercase" letterSpacing={0.5}>
            Preferences
          </H3>
          <SettingItem
            icon="bell"
            title="Push Notifications"
            subtitle="Receive payment notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '$borderColor', true: '$primary' }}
                thumbColor="$white"
              />
            }
          />
          <SettingItem
            icon="moon"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '$borderColor', true: '$primary' }}
                thumbColor="$white"
              />
            }
          />
          <SettingItem
            icon="globe"
            title="Language"
            subtitle="English"
            onPress={() => router.push('/language')}
          />
        </YStack>

        {/* Security Section */}
        <YStack marginBottom="$8">
          <H3 fontSize="$4" fontWeight="600" color="$colorTertiary" marginBottom="$2" paddingHorizontal="$6" textTransform="uppercase" letterSpacing={0.5}>
            Security
          </H3>
          <SettingItem
            icon="lock"
            title="Payment Limits"
            subtitle="Set maximum transaction amounts"
            onPress={() => router.push('/payment-limits')}
          />
          <SettingItem
            icon="shield"
            title="Two-Factor Authentication"
            subtitle="Add extra security to your account"
            onPress={() => router.push('/2fa')}
          />
          <SettingItem
            icon="doc.text"
            title="Terms & Privacy"
            subtitle="View legal documents"
            onPress={() => router.push('/terms')}
          />
        </YStack>

        {/* Support Section */}
        <YStack marginBottom="$8">
          <H3 fontSize="$4" fontWeight="600" color="$colorTertiary" marginBottom="$2" paddingHorizontal="$6" textTransform="uppercase" letterSpacing={0.5}>
            Support
          </H3>
          <SettingItem
            icon="questionmark.circle"
            title="Help & FAQ"
            subtitle="Get answers to common questions"
            onPress={() => router.push('/help')}
          />
          <SettingItem
            icon="envelope"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => router.push('/contact')}
          />
          <SettingItem
            icon="info.circle"
            title="About Flik Pay"
            subtitle="Version 1.0.0"
            onPress={() => router.push('/about')}
          />
        </YStack>

        {/* Account Actions */}
        <YStack marginBottom="$8">
          <H3 fontSize="$4" fontWeight="600" color="$colorTertiary" marginBottom="$2" paddingHorizontal="$6" textTransform="uppercase" letterSpacing={0.5}>
            Account
          </H3>
          <SettingItem
            icon="arrow.right.square"
            title="Logout"
            onPress={handleLogout}
          />
          <SettingItem
            icon="trash"
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={handleDeleteAccount}
            destructive
          />
        </YStack>

        {/* App Version */}
        <YStack alignItems="center" paddingVertical="$8" paddingHorizontal="$6">
          <Text fontSize="$4" fontWeight="600" color="$colorTertiary" marginBottom="$1">
            Flik Pay v1.0.0
          </Text>
          <Text fontSize="$3" color="$colorTertiary">
            Powered by UniCredit Bank Slovenia
          </Text>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

