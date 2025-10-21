import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import { router } from 'expo-router';
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

export default function SendMoneyScreen() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTransaction, user } = useApp();

  const handleSendMoney = async () => {
    if (!amount || !recipient) {
      Alert.alert('Error', 'Please enter both amount and recipient');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (user && amountValue > user.balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Add transaction to context
      addTransaction({
        type: 'sent',
        amount: amountValue,
        recipient,
        description: message || 'Payment sent',
        status: 'completed',
      });
      
      Alert.alert(
        'Payment Sent',
        `€${amount} has been sent to ${recipient}`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  const handleSelectContact = () => {
    Alert.alert('Select Contact', 'Contact selection would open here');
  };

  const handleScanQR = () => {
    Alert.alert('Scan QR Code', 'QR scanner would open here');
  };

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
            <Text style={styles.title}>Send Money</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Amount Input */}
          <View style={styles.amountSection}>
            <Text style={styles.sectionLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>€</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                autoFocus
              />
            </View>
          </View>

          {/* Recipient Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Send to</Text>
            
            <TouchableOpacity style={styles.recipientInput} onPress={handleSelectContact}>
              <View style={styles.recipientLeft}>
                <IconSymbol name="person.circle" size={24} color="#8E8E93" />
                <TextInput
                  style={styles.recipientTextInput}
                  value={recipient}
                  onChangeText={setRecipient}
                  placeholder="Enter phone number or email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <IconSymbol name="chevron.right" size={16} color="#8E8E93" />
            </TouchableOpacity>

            <View style={styles.recipientActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleSelectContact}>
                <IconSymbol name="person.2" size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Contacts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleScanQR}>
                <IconSymbol name="qrcode" size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Scan QR</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Message Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Message (Optional)</Text>
            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Add a note..."
              multiline
              maxLength={100}
            />
            <Text style={styles.characterCount}>{message.length}/100</Text>
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Quick Amount</Text>
            <View style={styles.quickAmounts}>
              {['10', '25', '50', '100'].map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  style={styles.quickAmountButton}
                  onPress={() => setAmount(quickAmount)}
                >
                  <Text style={styles.quickAmountText}>€{quickAmount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Send Button */}
          <View style={styles.sendButtonContainer}>
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!amount || !recipient || isLoading) && styles.sendButtonDisabled
              ]}
              onPress={handleSendMoney}
              disabled={!amount || !recipient || isLoading}
            >
              <Text style={styles.sendButtonText}>
                {isLoading ? 'Sending...' : `Send €${amount || '0.00'}`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <IconSymbol name="lock.shield" size={20} color="#34C759" />
            <Text style={styles.securityText}>
              Your payment is protected by bank-level security
            </Text>
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
  amountSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
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
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  recipientInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  recipientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recipientTextInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
  },
  recipientActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
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
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 6,
  },
  messageInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000000',
    minHeight: 80,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  characterCount: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
    marginTop: 4,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
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
  quickAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  sendButtonContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  securityText: {
    fontSize: 14,
    color: '#34C759',
    marginLeft: 8,
    fontWeight: '500',
  },
});
