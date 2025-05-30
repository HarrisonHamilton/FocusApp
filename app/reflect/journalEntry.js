
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export default function JournalEntryScreen() {
  const { title: paramTitle, body: paramBody, date } = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(paramTitle || '');
  const [body, setBody] = useState(paramBody || '');
  const router = useRouter();

  const saveUpdatedEntry = async () => {
    if (!date) return;
    try {
      const raw = await AsyncStorage.getItem('journalEntries');
      const all = raw ? JSON.parse(raw) : {};
      all[date] = { title, body, date };
      await AsyncStorage.setItem('journalEntries', JSON.stringify(all));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Saved', 'Your journal entry was updated.');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update entry.');
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteEntry },
      ]
    );
  };

  const deleteEntry = async () => {
    if (!date) return;
    try {
      const raw = await AsyncStorage.getItem('journalEntries');
      const all = raw ? JSON.parse(raw) : {};
      delete all[date];
      await AsyncStorage.setItem('journalEntries', JSON.stringify(all));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      router.replace('/reflect/journal'); // Go back and refresh calendar
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to delete entry.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={{ marginTop: 60 }}>
          <Text style={styles.header}>📖 Entry for {date}</Text>

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Edit Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.textArea}
                placeholder="Edit your thoughts..."
                value={body}
                onChangeText={setBody}
                placeholderTextColor="#888"
                multiline
              />
              <TouchableOpacity style={styles.button} onPress={saveUpdatedEntry}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.body}>{body}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.buttonHalf} onPress={() => setIsEditing(true)}>
                  <Text style={styles.buttonText}>✏️ Edit Entry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonHalf, { backgroundColor: '#822' }]} onPress={confirmDelete}>
                  <Text style={styles.buttonText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  body: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 160,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonHalf: {
    flex: 1,
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
