import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="chevron.right" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Support</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Help</Text>
          <Text style={styles.description}>
            Contact information and support options would be displayed here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', color: '#000000' },
  placeholder: { width: 24 },
  content: { flex: 1, paddingHorizontal: 24 },
  section: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#000000', marginBottom: 16 },
  description: { fontSize: 16, color: '#666666', lineHeight: 22 },
});
