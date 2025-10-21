import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, H2, H3, Text, XStack, YStack } from 'tamagui';

export default function HomeScreen() {
  const { user, transactions, formatCurrency } = useApp();

  const handleSendMoney = () => {
    router.push('/send-money');
  };

  const handleRequestMoney = () => {
    // router.push('/request-money');
    console.log('Request money feature not implemented yet');
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '$background' }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <XStack alignItems="center" paddingHorizontal="$6" paddingTop="$5" paddingBottom="$5">
          <YStack marginRight="$4">
            <YStack
              width={50}
              height={50}
              borderRadius="$full"
              backgroundColor="$black"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="$white" fontSize="$lg" fontWeight="bold">
                flik
              </Text>
            </YStack>
          </YStack>
          <H2 fontWeight="bold" color="$color">
            Welcome back!
          </H2>
        </XStack>

        {/* Quick Actions */}
        <YStack paddingHorizontal="$6" marginBottom="$8">
          <H3 fontWeight="bold" color="$color" marginBottom="$4">
            Quick Actions
          </H3>
          
          <XStack justifyContent="space-between" marginBottom="$4">
            <TouchableOpacity style={{ flex: 1 }} onPress={handleSendMoney}>
              <Card
                flex={1}
                alignItems="center"
                backgroundColor="$surface"
                paddingVertical="$5"
                paddingHorizontal="$4"
                borderRadius="$md"
                marginHorizontal="$1"
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
                elevation={2}
              >
                <YStack
                  width={48}
                  height={48}
                  borderRadius={24}
                  backgroundColor="#007AFF"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom="$2"
                >
                  <IconSymbol name="arrow.up.circle.fill" size={24} color="#ffffff" />
                </YStack>
                <Text fontSize="$3" fontWeight="600" color="$color" textAlign="center">
                  Send Money
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1 }} onPress={handleRequestMoney}>
              <Card
                flex={1}
                alignItems="center"
                backgroundColor="$surface"
                paddingVertical="$5"
                paddingHorizontal="$4"
                borderRadius="$md"
                marginHorizontal="$1"
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
                elevation={2}
              >
                <YStack
                  width={48}
                  height={48}
                  borderRadius={24}
                  backgroundColor="#34C759"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom="$2"
                >
                  <IconSymbol name="arrow.down.circle.fill" size={24} color="#ffffff" />
                </YStack>
                <Text fontSize="$3" fontWeight="600" color="$color" textAlign="center">
                  Request Money
                </Text>
              </Card>
            </TouchableOpacity>
          </XStack>

          <XStack justifyContent="space-between" marginBottom="$4">
            <TouchableOpacity style={{ flex: 1 }} onPress={handleQRPayment}>
              <Card
                flex={1}
                alignItems="center"
                backgroundColor="$surface"
                paddingVertical="$5"
                paddingHorizontal="$4"
                borderRadius="$md"
                marginHorizontal="$1"
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
                elevation={2}
              >
                <YStack
                  width={48}
                  height={48}
                  borderRadius={24}
                  backgroundColor="#FF9500"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom="$2"
                >
                  <IconSymbol name="qrcode" size={24} color="#ffffff" />
                </YStack>
                <Text fontSize="$3" fontWeight="600" color="$color" textAlign="center">
                  QR Payment
                </Text>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1 }} onPress={handleViewGroups}>
              <Card
                flex={1}
                alignItems="center"
                backgroundColor="$surface"
                paddingVertical="$5"
                paddingHorizontal="$4"
                borderRadius="$md"
                marginHorizontal="$1"
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={4}
                elevation={2}
              >
                <YStack
                  width={48}
                  height={48}
                  borderRadius={24}
                  backgroundColor="#5856D6"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom="$2"
                >
                  <IconSymbol name="person.3" size={24} color="#ffffff" />
                </YStack>
                <Text fontSize="$3" fontWeight="600" color="$color" textAlign="center">
                  Groups
                </Text>
              </Card>
            </TouchableOpacity>
          </XStack>
        </YStack>

        {/* Recent Transactions */}
        <YStack paddingHorizontal="$6" marginBottom="$8">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
            <H3 fontWeight="bold" color="$color">
              Recent Transactions
            </H3>
            <TouchableOpacity onPress={handleViewTransactions}>
              <Text fontSize="$4" color="$primary" fontWeight="600">
                View All
              </Text>
            </TouchableOpacity>
          </XStack>

          <Card
            backgroundColor="$surface"
            borderRadius="$md"
            padding="$4"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={0.05}
            shadowRadius={4}
            elevation={2}
          >
            <XStack alignItems="center" paddingVertical="$3" borderBottomWidth={1} borderBottomColor="$borderLight">
              <YStack marginRight="$3">
                <IconSymbol name="arrow.up.circle.fill" size={20} color="#FF3B30" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="$4" fontWeight="600" color="$color" marginBottom="$1">
                  Payment to John Doe
                </Text>
                <Text fontSize="$3" color="$colorSecondary">
                  Today, 2:30 PM
                </Text>
              </YStack>
              <Text fontSize="$4" fontWeight="bold" color="#FF3B30">
                -€25.00
              </Text>
            </XStack>

            <XStack alignItems="center" paddingVertical="$3" borderBottomWidth={1} borderBottomColor="$borderLight">
              <YStack marginRight="$3">
                <IconSymbol name="arrow.down.circle.fill" size={20} color="#34C759" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="$4" fontWeight="600" color="$color" marginBottom="$1">
                  Payment from Jane Smith
                </Text>
                <Text fontSize="$3" color="$colorSecondary">
                  Yesterday, 4:15 PM
                </Text>
              </YStack>
              <Text fontSize="$4" fontWeight="bold" color="#34C759">
                +€50.00
              </Text>
            </XStack>

            <XStack alignItems="center" paddingVertical="$3">
              <YStack marginRight="$3">
                <IconSymbol name="qrcode" size={20} color="#FF9500" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="$4" fontWeight="600" color="$color" marginBottom="$1">
                  QR Payment - Coffee Shop
                </Text>
                <Text fontSize="$3" color="$colorSecondary">
                  2 days ago, 10:45 AM
                </Text>
              </YStack>
              <Text fontSize="$4" fontWeight="bold" color="#FF3B30">
                -€4.50
              </Text>
            </XStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

