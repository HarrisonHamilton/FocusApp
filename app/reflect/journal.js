import React, { useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Text, SafeAreaView } from 'react-native';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>Journal Entry</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Write your thoughts here..."
          placeholderTextColor="#888"
          value={entry}
          onChangeText={setEntry}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60, // 👈 Push content down from the top
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 16,
  },
  textArea: {
    flex: 1,
    color: 'white',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
