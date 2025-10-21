import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddExpenseScreen() {
  const { groupId } = useLocalSearchParams();
  const { groups, addExpense, user } = useApp();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'exact' | 'percentage' | 'shares'>('equal');
  const [splits, setSplits] = useState<{ [userId: string]: number }>({});
  const [category, setCategory] = useState('');

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

  const handleAmountChange = (text: string) => {
    setAmount(text);
    
    // Auto-calculate splits when amount changes
    if (splitType === 'equal' && text) {
      const amountValue = parseFloat(text);
      if (!isNaN(amountValue)) {
        const equalAmount = amountValue / group.members.length;
        const newSplits: { [userId: string]: number } = {};
        group.members.forEach(member => {
          newSplits[member.id] = equalAmount;
        });
        setSplits(newSplits);
      }
    }
  };

  const handleSplitChange = (userId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setSplits(prev => ({
      ...prev,
      [userId]: numValue,
    }));
  };

  const handleSubmit = () => {
    if (!amount || !description.trim()) {
      Alert.alert('Error', 'Please enter amount and description');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    // Validate splits
    const totalSplit = Object.values(splits).reduce((sum, val) => sum + val, 0);
    if (Math.abs(totalSplit - amountValue) > 0.01) {
      Alert.alert('Error', 'Split amounts must equal the total amount');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }

    const expenseSplits = Object.entries(splits).map(([userId, amount]) => ({
      userId,
      amount,
    }));

    addExpense({
      groupId: group.id,
      amount: amountValue,
      description: description.trim(),
      paidBy: user.id,
      splitType,
      splits: expenseSplits,
      category: category.trim() || undefined,
    });

    Alert.alert('Success', 'Expense added successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const getMemberName = (userId: string) => {
    const member = group.members.find(m => m.id === userId);
    return member?.name || 'Unknown';
  };

  const SplitTypeButton = ({ type, title, icon }: { type: string; title: string; icon: string }) => (
    <TouchableOpacity
      style={[
        styles.splitTypeButton,
        splitType === type && styles.activeSplitTypeButton
      ]}
      onPress={() => setSplitType(type as any)}
    >
      <IconSymbol 
        name={icon} 
        size={20} 
        color={splitType === type ? '#007AFF' : '#8E8E93'} 
      />
      <Text style={[
        styles.splitTypeText,
        splitType === type && styles.activeSplitTypeText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Expense</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Group Info */}
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupMembers}>
              {group.members.length} member{group.members.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>€</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                placeholder="0.00"
                keyboardType="decimal-pad"
                autoFocus
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="What was this expense for?"
              multiline
            />
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Category (Optional)</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="e.g., Food, Transport, Entertainment"
            />
          </View>

          {/* Split Type */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Split Type</Text>
            <View style={styles.splitTypeContainer}>
              <SplitTypeButton type="equal" title="Equal" icon="equal.circle" />
              <SplitTypeButton type="exact" title="Exact" icon="eurosign.circle" />
              <SplitTypeButton type="percentage" title="Percentage" icon="percent" />
              <SplitTypeButton type="shares" title="Shares" icon="chart.pie" />
            </View>
          </View>

          {/* Split Details */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Split Details</Text>
            <View style={styles.splitsContainer}>
              {group.members.map((member) => (
                <View key={member.id} style={styles.splitItem}>
                  <View style={styles.splitMemberInfo}>
                    <Text style={styles.splitMemberName}>
                      {member.name}
                      {member.id === user?.id && ' (You)'}
                    </Text>
                    {splitType === 'equal' && (
                      <Text style={styles.splitHint}>
                        €{(parseFloat(amount) / group.members.length || 0).toFixed(2)}
                      </Text>
                    )}
                  </View>
                  
                  {splitType !== 'equal' && (
                    <View style={styles.splitInputContainer}>
                      <TextInput
                        style={styles.splitInput}
                        value={splits[member.id]?.toString() || ''}
                        onChangeText={(text) => handleSplitChange(member.id, text)}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                      />
                      <Text style={styles.splitCurrency}>€</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
            
            {amount && (
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Split:</Text>
                <Text style={styles.totalAmount}>
                  €{Object.values(splits).reduce((sum, val) => sum + val, 0).toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!amount || !description.trim()) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!amount || !description.trim()}
            >
              <Text style={styles.submitButtonText}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 32,
  },
  groupInfo: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  splitTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
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
  activeSplitTypeButton: {
    backgroundColor: '#E3F2FD',
  },
  splitTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 4,
  },
  activeSplitTypeText: {
    color: '#007AFF',
  },
  splitsContainer: {
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
  splitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  splitMemberInfo: {
    flex: 1,
  },
  splitMemberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  splitHint: {
    fontSize: 14,
    color: '#8E8E93',
  },
  splitInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  splitInput: {
    width: 80,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'right',
    marginRight: 4,
  },
  splitCurrency: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  submitContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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
