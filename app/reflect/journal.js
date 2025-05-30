
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

export default function JournalScreen() {
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const STORAGE_KEY = 'journalEntries';
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    });
  }, []);

  const saveEntry = async () => {
    if (!selectedDate) return;
    const updated = {
      ...entries,
      [selectedDate]: {
        title,
        body,
        date: selectedDate,
      },
    };
    setEntries(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    requestAnimationFrame(() => {
      setTimeout(() => {
        router.push({
          pathname: '/reflect/journalEntry',
          params: {
            title,
            body,
            date: selectedDate,
          },
        });
      }, 0);
    });
  };

  const onDateSelected = (date) => {
    const selected = date.dateString;
    setSelectedDate(selected);
    const entry = entries[selected];

    if (entry && entry.title && entry.body) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          router.push({
            pathname: '/reflect/journalEntry',
            params: {
              title: entry.title,
              body: entry.body,
              date: entry.date,
            },
          });
        }, 0);
      });
    } else {
      setTitle('');
      setBody('');
    }
  };

  const markedDates = Object.keys(entries).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'skyblue' };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: '#444',
    };
  }

  const showForm = selectedDate && !entries[selectedDate];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.header}>📅 Reflective Calendar</Text>
            <Calendar
              onDayPress={onDateSelected}
              markedDates={markedDates}
              theme={{
                backgroundColor: 'black',
                calendarBackground: 'black',
                dayTextColor: 'white',
                todayTextColor: 'skyblue',
                selectedDayTextColor: 'white',
                selectedDayBackgroundColor: '#444',
                monthTextColor: 'white',
                arrowColor: 'white',
                textDisabledColor: '#555',
              }}
            />
            {showForm && (
              <View style={styles.entrySection}>
                <Text style={styles.dateLabel}>New Entry for {selectedDate}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  placeholderTextColor="#888"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={styles.textArea}
                  placeholder="Write your thoughts..."
                  placeholderTextColor="#888"
                  value={body}
                  onChangeText={setBody}
                  multiline
                />
                <TouchableOpacity style={styles.button} onPress={saveEntry}>
                  <Text style={styles.buttonText}>Save Entry</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: 'black' },
  container: { flex: 1, padding: 20 },
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  entrySection: { marginTop: 20 },
  dateLabel: { color: '#ccc', fontSize: 16, marginBottom: 10 },
  input: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
