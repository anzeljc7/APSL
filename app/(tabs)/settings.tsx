import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, destructive && styles.settingIconDestructive]}>
          <IconSymbol name={icon} size={20} color={destructive ? '#FF3B30' : '#007AFF'} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, destructive && styles.settingTitleDestructive]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightElement || (
        onPress && <IconSymbol name="chevron.right" size={16} color="#8E8E93" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
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
                trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
                thumbColor="#ffffff"
              />
            }
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem
            icon="bell"
            title="Push Notifications"
            subtitle="Receive payment notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
                thumbColor="#ffffff"
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
                trackColor={{ false: '#E0E0E0', true: '#007AFF' }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingItem
            icon="globe"
            title="Language"
            subtitle="English"
            onPress={() => router.push('/language')}
          />
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
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
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
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
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
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
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Flik Pay v1.0.0</Text>
          <Text style={styles.versionSubtext}>
            Powered by UniCredit Bank Slovenia
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    paddingHorizontal: 24,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingIconDestructive: {
    backgroundColor: '#FFE5E5',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  settingTitleDestructive: {
    color: '#FF3B30',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
