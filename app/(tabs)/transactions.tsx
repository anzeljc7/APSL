import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { transactions } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays === 0) return 'Today';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return <IconSymbol name="arrow.up.circle.fill" size={20} color="#FF3B30" />;
      case 'received':
        return <IconSymbol name="arrow.down.circle.fill" size={20} color="#34C759" />;
      case 'qr':
        return <IconSymbol name="qrcode" size={20} color="#FF9500" />;
      default:
        return <IconSymbol name="circle.fill" size={20} color="#8E8E93" />;
    }
  };

  const getTransactionTitle = (transaction: any) => {
    switch (transaction.type) {
      case 'sent':
        return `Payment to ${transaction.recipient}`;
      case 'received':
        return `Payment from ${transaction.sender}`;
      case 'qr':
        return `QR Payment - ${transaction.merchant}`;
      default:
        return 'Transaction';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getTransactionTitle(transaction).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterButtonText, selectedFilter === 'all' && styles.filterButtonTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'sent' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('sent')}
          >
            <Text style={[styles.filterButtonText, selectedFilter === 'sent' && styles.filterButtonTextActive]}>
              Sent
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'received' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('received')}
          >
            <Text style={[styles.filterButtonText, selectedFilter === 'received' && styles.filterButtonTextActive]}>
              Received
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'qr' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('qr')}
          >
            <Text style={[styles.filterButtonText, selectedFilter === 'qr' && styles.filterButtonTextActive]}>
              QR Payments
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        {filteredTransactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              {getTransactionIcon(transaction.type)}
            </View>
            
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                {getTransactionTitle(transaction)}
              </Text>
              <Text style={styles.transactionDescription}>
                {transaction.description}
              </Text>
              <Text style={styles.transactionDate}>
                {formatDate(transaction.date)} • {formatTime(transaction.date)}
              </Text>
            </View>
            
            <View style={styles.transactionAmountContainer}>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'received' && styles.transactionAmountPositive
              ]}>
                {transaction.type === 'received' ? '+' : '-'}€{transaction.amount.toFixed(2)}
              </Text>
              <Text style={styles.transactionStatus}>
                {transaction.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        
        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <IconSymbol name="doc.text" size={48} color="#8E8E93" />
            <Text style={styles.emptyStateText}>No transactions found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filter criteria
            </Text>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  filterContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  transactionItem: {
    flexDirection: 'row',
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
  transactionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 2,
  },
  transactionAmountPositive: {
    color: '#34C759',
  },
  transactionStatus: {
    fontSize: 12,
    color: '#8E8E93',
    textTransform: 'capitalize',
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
  },
});
