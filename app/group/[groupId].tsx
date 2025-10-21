import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupDetailScreen() {
  const { groupId } = useLocalSearchParams();
  const { groups, calculateDebts, getGroupBalance, user } = useApp();
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'settle'>('expenses');

  const group = groups.find(g => g.id === groupId);
  
  if (!group) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Group not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const balances = getGroupBalance(group.id);
  const debts = calculateDebts(group.id);
  const userBalance = balances.find(b => b.userId === user?.id)?.balance || 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getMemberName = (userId: string) => {
    const member = group.members.find(m => m.id === userId);
    return member?.name || 'Unknown';
  };

  const handleAddExpense = () => {
    router.push(`/add-expense?groupId=${groupId}`);
  };

  const handleSettleDebt = (debt: any) => {
    Alert.alert(
      'Settle Debt',
      `Pay €${debt.amount.toFixed(2)} to ${getMemberName(debt.toUserId)}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pay',
          onPress: () => {
            // In a real app, this would trigger a payment
            Alert.alert('Payment', 'Payment would be processed here');
          },
        },
      ]
    );
  };

  const TabButton = ({ tab, title, icon }: { tab: string; title: string; icon: string }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab as any)}
    >
      <IconSymbol 
        name={icon} 
        size={20} 
        color={activeTab === tab ? '#007AFF' : '#8E8E93'} 
      />
      <Text style={[
        styles.tabText, 
        activeTab === tab && styles.activeTabText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.memberCount}>
            {group.members.length} member{group.members.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <IconSymbol name="plus" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Your Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={[
          styles.balanceAmount,
          userBalance >= 0 ? styles.positiveBalance : styles.negativeBalance
        ]}>
          {userBalance >= 0 ? '+' : ''}€{userBalance.toFixed(2)}
        </Text>
        <Text style={styles.balanceDescription}>
          {userBalance > 0 
            ? 'You are owed money' 
            : userBalance < 0 
            ? 'You owe money' 
            : 'All settled up!'
          }
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TabButton tab="expenses" title="Expenses" icon="doc.text" />
        <TabButton tab="balances" title="Balances" icon="person.2" />
        <TabButton tab="settle" title="Settle" icon="checkmark.circle" />
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'expenses' && (
          <View style={styles.expensesTab}>
            {group.expenses.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="doc.text" size={48} color="#8E8E93" />
                <Text style={styles.emptyStateText}>No expenses yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Add an expense to start tracking shared costs
                </Text>
                <TouchableOpacity style={styles.addExpenseButton} onPress={handleAddExpense}>
                  <Text style={styles.addExpenseButtonText}>Add Expense</Text>
                </TouchableOpacity>
              </View>
            ) : (
              group.expenses.map((expense) => (
                <View key={expense.id} style={styles.expenseItem}>
                  <View style={styles.expenseHeader}>
                    <Text style={styles.expenseDescription}>{expense.description}</Text>
                    <Text style={styles.expenseAmount}>€{expense.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.expenseDetails}>
                    <Text style={styles.expensePaidBy}>
                      Paid by {getMemberName(expense.paidBy)}
                    </Text>
                    <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
                  </View>
                  <View style={styles.expenseSplits}>
                    {expense.splits.map((split, index) => (
                      <View key={index} style={styles.splitItem}>
                        <Text style={styles.splitName}>{getMemberName(split.userId)}</Text>
                        <Text style={styles.splitAmount}>€{split.amount.toFixed(2)}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === 'balances' && (
          <View style={styles.balancesTab}>
            {balances.map((balance) => (
              <View key={balance.userId} style={styles.balanceItem}>
                <View style={styles.balanceInfo}>
                  <Text style={styles.balanceName}>
                    {getMemberName(balance.userId)}
                    {balance.userId === user?.id && ' (You)'}
                  </Text>
                </View>
                <Text style={[
                  styles.balanceValue,
                  balance.balance >= 0 ? styles.positiveBalance : styles.negativeBalance
                ]}>
                  {balance.balance >= 0 ? '+' : ''}€{balance.balance.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'settle' && (
          <View style={styles.settleTab}>
            {debts.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="checkmark.circle.fill" size={48} color="#34C759" />
                <Text style={styles.emptyStateText}>All settled up!</Text>
                <Text style={styles.emptyStateSubtext}>
                  No outstanding debts in this group
                </Text>
              </View>
            ) : (
              debts.map((debt, index) => (
                <View key={index} style={styles.debtItem}>
                  <View style={styles.debtInfo}>
                    <Text style={styles.debtText}>
                      {getMemberName(debt.fromUserId)} owes {getMemberName(debt.toUserId)}
                    </Text>
                    <Text style={styles.debtAmount}>€{debt.amount.toFixed(2)}</Text>
                  </View>
                  {debt.fromUserId === user?.id && (
                    <TouchableOpacity 
                      style={styles.settleButton}
                      onPress={() => handleSettleDebt(debt)}
                    >
                      <Text style={styles.settleButtonText}>Pay</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  memberCount: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positiveBalance: {
    color: '#34C759',
  },
  negativeBalance: {
    color: '#FF3B30',
  },
  balanceDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: '#E3F2FD',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  expensesTab: {
    paddingBottom: 20,
  },
  expenseItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  expenseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  expensePaidBy: {
    fontSize: 14,
    color: '#666666',
  },
  expenseDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  expenseSplits: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  splitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  splitName: {
    fontSize: 14,
    color: '#666666',
  },
  splitAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  balancesTab: {
    paddingBottom: 20,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settleTab: {
    paddingBottom: 20,
  },
  debtItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  debtInfo: {
    flex: 1,
  },
  debtText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  debtAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  settleButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  settleButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  addExpenseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addExpenseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
