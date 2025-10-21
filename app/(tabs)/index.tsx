import { IconSymbol } from '@/components/ui/icon-symbol';
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
  const { user, transactions } = useApp();

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
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>€{user?.balance.toFixed(2) || '0.00'}</Text>
        </View>

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
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    marginRight: 16,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
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
