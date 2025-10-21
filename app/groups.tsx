import { IconSymbol } from '@/components/ui/icon-symbol';
import { useApp } from '@/contexts/AppContext';
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

export default function GroupsScreen() {
  const { groups, createGroup, joinGroup, leaveGroup, user } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    const groupId = createGroup(groupName.trim(), groupDescription.trim() || undefined);
    setGroupName('');
    setGroupDescription('');
    setShowCreateForm(false);
    
    Alert.alert('Success', 'Group created successfully!', [
      {
        text: 'OK',
        onPress: () => router.push(`/group/${groupId}`),
      },
    ]);
  };

  const handleJoinGroup = (groupId: string) => {
    Alert.alert(
      'Join Group',
      'Are you sure you want to join this group?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Join',
          onPress: () => {
            joinGroup(groupId);
            Alert.alert('Success', 'You have joined the group!');
          },
        },
      ]
    );
  };

  const handleLeaveGroup = (groupId: string, groupName: string) => {
    Alert.alert(
      'Leave Group',
      `Are you sure you want to leave "${groupName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            leaveGroup(groupId);
            Alert.alert('Success', 'You have left the group.');
          },
        },
      ]
    );
  };

  const isUserInGroup = (group: any) => {
    return group.members.some((member: any) => member.id === user?.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateForm(true)}
        >
          <IconSymbol name="plus" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Create Group Form */}
      {showCreateForm && (
        <View style={styles.createForm}>
          <Text style={styles.formTitle}>Create New Group</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Group name"
            value={groupName}
            onChangeText={setGroupName}
            autoFocus
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)"
            value={groupDescription}
            onChangeText={setGroupDescription}
            multiline
            numberOfLines={3}
          />
          
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setShowCreateForm(false);
                setGroupName('');
                setGroupDescription('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.createGroupButton}
              onPress={handleCreateGroup}
            >
              <Text style={styles.createGroupButtonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Groups List */}
      <ScrollView style={styles.groupsList} showsVerticalScrollIndicator={false}>
        {groups.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="person.3" size={48} color="#8E8E93" />
            <Text style={styles.emptyStateText}>No groups yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Create a group to start splitting expenses with friends
            </Text>
          </View>
        ) : (
          groups.map((group) => (
            <TouchableOpacity 
              key={group.id} 
              style={styles.groupCard}
              onPress={() => router.push(`/group/${group.id}`)}
            >
              <View style={styles.groupHeader}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  {group.description && (
                    <Text style={styles.groupDescription}>{group.description}</Text>
                  )}
                  <Text style={styles.groupDate}>
                    Created {formatDate(group.createdAt)}
                  </Text>
                </View>
                
                <View style={styles.groupActions}>
                  {isUserInGroup(group) ? (
                    <TouchableOpacity
                      style={styles.leaveButton}
                      onPress={() => handleLeaveGroup(group.id, group.name)}
                    >
                      <IconSymbol name="person.badge.minus" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.joinButton}
                      onPress={() => handleJoinGroup(group.id)}
                    >
                      <IconSymbol name="person.badge.plus" size={20} color="#007AFF" />
                    </TouchableOpacity>
                  )}
                  
                  <IconSymbol name="chevron.right" size={16} color="#8E8E93" />
                </View>
              </View>
              
              <View style={styles.groupStats}>
                <View style={styles.statItem}>
                  <IconSymbol name="person.2" size={16} color="#8E8E93" />
                  <Text style={styles.statText}>
                    {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                
                <View style={styles.statItem}>
                  <IconSymbol name="doc.text" size={16} color="#8E8E93" />
                  <Text style={styles.statText}>
                    {group.expenses.length} expense{group.expenses.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                
                {isUserInGroup(group) && (
                  <View style={styles.statItem}>
                    <IconSymbol name="checkmark.circle.fill" size={16} color="#34C759" />
                    <Text style={styles.statText}>Member</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  createButton: {
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
  createForm: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 20,
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
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  createGroupButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  createGroupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  groupsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  groupCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  groupDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  groupActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    padding: 8,
    marginRight: 8,
  },
  leaveButton: {
    padding: 8,
    marginRight: 8,
  },
  groupStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
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
  },
});
