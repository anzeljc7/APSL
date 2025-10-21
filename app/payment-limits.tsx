import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentLimitsScreen() {
  const [dailyLimit, setDailyLimit] = useState('1000');
  const [monthlyLimit, setMonthlyLimit] = useState('10000');
  const [singleTransactionLimit, setSingleTransactionLimit] = useState('5000');

  const handleSaveLimits = () => {
    Alert.alert('Success', 'Payment limits updated successfully', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="chevron.right" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Limits</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Limits</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Daily Limit (€)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter daily limit"
              value={dailyLimit}
              onChangeText={setDailyLimit}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monthly Limit (€)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter monthly limit"
              value={monthlyLimit}
              onChangeText={setMonthlyLimit}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Single Transaction Limit (€)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter single transaction limit"
              value={singleTransactionLimit}
              onChangeText={setSingleTransactionLimit}
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveLimits}>
          <Text style={styles.saveButtonText}>Save Limits</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
