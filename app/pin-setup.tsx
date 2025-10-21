import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PinSetupScreen() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1: Enter PIN, 2: Confirm PIN

  const handlePinSubmit = () => {
    if (pin.length < 4) {
      Alert.alert('Error', 'PIN must be at least 4 digits');
      return;
    }
    setStep(2);
  };

  const handleConfirmPin = () => {
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      setConfirmPin('');
      return;
    }
    
    // Simulate PIN setup completion
    Alert.alert('Success', 'PIN setup completed successfully!', [
      {
        text: 'OK',
        onPress: () => router.replace('/(tabs)'),
      },
    ]);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setConfirmPin('');
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>flik</Text>
            </View>
          </View>
          
          <Text style={styles.title}>
            {step === 1 ? 'Create Your PIN' : 'Confirm Your PIN'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 1 
              ? 'Choose a 4-6 digit PIN for secure access to your account'
              : 'Please confirm your PIN to continue'
            }
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.pinContainer}>
            <TextInput
              style={styles.pinInput}
              value={step === 1 ? pin : confirmPin}
              onChangeText={step === 1 ? setPin : setConfirmPin}
              placeholder="••••"
              keyboardType="numeric"
              maxLength={6}
              secureTextEntry
              autoFocus
            />
            <Text style={styles.pinHint}>
              {step === 1 ? 'Enter PIN' : 'Confirm PIN'}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              ((step === 1 && pin.length < 4) || (step === 2 && confirmPin.length < 4)) && styles.continueButtonDisabled
            ]}
            onPress={step === 1 ? handlePinSubmit : handleConfirmPin}
            disabled={(step === 1 && pin.length < 4) || (step === 2 && confirmPin.length < 4)}
          >
            <Text style={styles.continueButtonText}>
              {step === 1 ? 'Continue' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your PIN is encrypted and stored securely on your device
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 60,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  pinContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  pinInput: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 16,
    minWidth: 200,
    height: 50,
  },
  pinHint: {
    fontSize: 16,
    color: '#666666',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 'auto',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
