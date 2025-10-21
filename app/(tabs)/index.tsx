import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { BorderRadius, Colors, Fonts, Spacing } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';
import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, transactions, formatCurrency } = useApp();

  const handleSendMoney = () => {
    router.push('/send-money');
  };

  const handleRequestMoney = () => {
    router.push('/request-money');
  };

  const handleQRPayment = () => {
    router.push('/qr-payment');
  };

  const handleViewTransactions = () => {
    router.push('/(tabs)/transactions');
  };

  const handleViewGroups = () => {
    router.push('/(tabs)/groups');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>flik</Text>
            </View>
          </View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>

        {/* Balance Card */}
        <Card style={styles.balanceCard} shadow="md">
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(user?.balance || 0)}</Text>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSendMoney}>
              <View style={[styles.actionIcon, { backgroundColor: '#007AFF' }]}>
                <IconSymbol name="arrow.up.circle.fill" size={24} color="#ffffff" />
              </View>
              <Text style={styles.actionText}>Send Money</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleRequestMoney}>
              <View style={[styles.actionIcon, { backgroundColor: '#34C759' }]}>
                <IconSymbol name="arrow.down.circle.fill" size={24} color="#ffffff" />
              </View>
              <Text style={styles.actionText}>Request Money</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleQRPayment}>
              <View style={[styles.actionIcon, { backgroundColor: '#FF9500' }]}>
                <IconSymbol name="qrcode" size={24} color="#ffffff" />
              </View>
              <Text style={styles.actionText}>QR Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleViewGroups}>
              <View style={[styles.actionIcon, { backgroundColor: '#5856D6' }]}>
                <IconSymbol name="person.3" size={24} color="#ffffff" />
              </View>
              <Text style={styles.actionText}>Groups</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.recentTransactions}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={handleViewTransactions}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionList}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSymbol name="arrow.up.circle.fill" size={20} color="#FF3B30" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Payment to John Doe</Text>
                <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
              </View>
              <Text style={styles.transactionAmount}>-€25.00</Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSymbol name="arrow.down.circle.fill" size={20} color="#34C759" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Payment from Jane Smith</Text>
                <Text style={styles.transactionDate}>Yesterday, 4:15 PM</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: '#34C759' }]}>+€50.00</Text>
            </View>

            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSymbol name="qrcode" size={20} color="#FF9500" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>QR Payment - Coffee Shop</Text>
                <Text style={styles.transactionDate}>2 days ago, 10:45 AM</Text>
              </View>
              <Text style={styles.transactionAmount}>-€4.50</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[5],
    paddingBottom: Spacing[5],
  },
  logoContainer: {
    marginRight: Spacing[4],
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: Colors.neutral.white,
    fontSize: Fonts.fontSize.lg,
    fontWeight: Fonts.fontWeight.bold,
  },
  welcomeText: {
    fontSize: Fonts.fontSize['2xl'],
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.light.text,
  },
  balanceCard: {
    marginHorizontal: Spacing[6],
    marginBottom: Spacing[6],
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: Fonts.fontSize.base,
    color: Colors.light.textSecondary,
    marginBottom: Spacing[2],
  },
  balanceAmount: {
    fontSize: Fonts.fontSize['5xl'],
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.light.text,
  },
  quickActions: {
    paddingHorizontal: Spacing[6],
    marginBottom: Spacing[8],
  },
  sectionTitle: {
    fontSize: Fonts.fontSize.xl,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.light.text,
    marginBottom: Spacing[4],
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  recentTransactions: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  transactionList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
});
