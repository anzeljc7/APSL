import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function QRPaymentScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [qrData, setQrData] = useState('');

  const handleScanQR = () => {
    setIsScanning(true);
    
    // Simulate QR scanning
    setTimeout(() => {
      setIsScanning(false);
      const mockQRData = 'flik://payment?amount=25.00&merchant=Coffee%20Shop&id=12345';
      setQrData(mockQRData);
      
      Alert.alert(
        'QR Code Detected',
        'Payment details found. Would you like to proceed?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Pay',
            onPress: () => handleProcessPayment(mockQRData),
          },
        ]
      );
    }, 2000);
  };

  const handleProcessPayment = (data: string) => {
    // Parse QR data (simplified)
    const url = new URL(data);
    const amount = url.searchParams.get('amount');
    const merchant = decodeURIComponent(url.searchParams.get('merchant') || '');
    
    Alert.alert(
      'Payment Confirmed',
      `€${amount} paid to ${merchant}`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleGenerateQR = () => {
    router.push('/generate-qr');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>QR Payment</Text>
        <View style={styles.placeholder} />
      </View>

      {/* QR Scanner Section */}
      <View style={styles.scannerSection}>
        <View style={styles.scannerContainer}>
          {isScanning ? (
            <View style={styles.scannerActive}>
              <View style={styles.scannerFrame}>
                <View style={styles.scannerCorner} />
                <View style={[styles.scannerCorner, styles.scannerCornerTopRight]} />
                <View style={[styles.scannerCorner, styles.scannerCornerBottomLeft]} />
                <View style={[styles.scannerCorner, styles.scannerCornerBottomRight]} />
              </View>
              <View style={styles.scannerLine} />
              <Text style={styles.scannerText}>Scanning QR code...</Text>
            </View>
          ) : (
            <View style={styles.scannerPlaceholder}>
              <IconSymbol name="qrcode" size={80} color="#8E8E93" />
              <Text style={styles.scannerPlaceholderText}>
                Position QR code within the frame
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonActive]}
          onPress={handleScanQR}
          disabled={isScanning}
        >
          <IconSymbol 
            name={isScanning ? "stop.circle.fill" : "camera.fill"} 
            size={24} 
            color="#ffffff" 
          />
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Stop Scanning' : 'Scan QR Code'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Generate QR Section */}
      <View style={styles.generateSection}>
        <Text style={styles.sectionTitle}>Generate Payment QR</Text>
        <Text style={styles.sectionSubtitle}>
          Create a QR code for others to pay you
        </Text>
        
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateQR}>
          <IconSymbol name="qrcode.viewfinder" size={24} color="#007AFF" />
          <Text style={styles.generateButtonText}>Generate QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Recent QR Payments */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent QR Payments</Text>
        
        <View style={styles.recentList}>
          <View style={styles.recentItem}>
            <View style={styles.recentIcon}>
              <IconSymbol name="qrcode" size={20} color="#FF9500" />
            </View>
            <View style={styles.recentDetails}>
              <Text style={styles.recentTitle}>Coffee Shop</Text>
              <Text style={styles.recentDate}>Today, 10:30 AM</Text>
            </View>
            <Text style={styles.recentAmount}>-€4.50</Text>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.recentIcon}>
              <IconSymbol name="qrcode" size={20} color="#FF9500" />
            </View>
            <View style={styles.recentDetails}>
              <Text style={styles.recentTitle}>Grocery Store</Text>
              <Text style={styles.recentDate}>Yesterday, 3:15 PM</Text>
            </View>
            <Text style={styles.recentAmount}>-€32.80</Text>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.recentIcon}>
              <IconSymbol name="qrcode" size={20} color="#FF9500" />
            </View>
            <View style={styles.recentDetails}>
              <Text style={styles.recentTitle}>Restaurant</Text>
              <Text style={styles.recentDate}>2 days ago, 7:45 PM</Text>
            </View>
            <Text style={styles.recentAmount}>-€18.50</Text>
          </View>
        </View>
      </View>

      {/* Help Section */}
      <View style={styles.helpSection}>
        <TouchableOpacity style={styles.helpButton}>
          <IconSymbol name="questionmark.circle" size={20} color="#007AFF" />
          <Text style={styles.helpButtonText}>How to use QR payments</Text>
        </TouchableOpacity>
      </View>
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
  scannerSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  scannerContainer: {
    width: width - 48,
    height: width - 48,
    backgroundColor: '#000000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  scannerActive: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scannerFrame: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  scannerCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#007AFF',
    borderWidth: 3,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  scannerCornerTopRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 3,
  },
  scannerCornerBottomLeft: {
    bottom: 0,
    top: 'auto',
    borderTopWidth: 0,
    borderBottomWidth: 3,
  },
  scannerCornerBottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  scannerLine: {
    position: 'absolute',
    width: 200,
    height: 2,
    backgroundColor: '#007AFF',
    top: '50%',
    left: 0,
  },
  scannerText: {
    position: 'absolute',
    bottom: 20,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  scannerPlaceholder: {
    alignItems: 'center',
  },
  scannerPlaceholderText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  scanButtonActive: {
    backgroundColor: '#FF3B30',
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  generateSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 12,
  },
  recentSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  recentList: {
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
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentIcon: {
    marginRight: 12,
  },
  recentDetails: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 14,
    color: '#666666',
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  helpSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  helpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
});
