
import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { VentContext } from '../../../contexts/VentContext';
import HapticButton from '../../../components/HapticButton';

export default function VentScreen() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { addVent } = useContext(VentContext);
  const router = useRouter();

  const handleSend = () => {
    if (title.trim()) {
      addVent(title);
      setTitle('');
      setMessage('');
      router.replace('/');
      router.replace('/reflect');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.orbIcon}>🌀</Text>
          <Text style={styles.title}>Vent a Thought</Text>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Give your vent a title..."
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.cardLarge}>
          <TextInput
            style={styles.textArea}
            placeholder="Write what’s on your mind..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </View>

        <HapticButton onPress={handleSend} style={styles.button}>
          <Text style={styles.buttonText}>Send to Orb</Text>
        </HapticButton>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  orbIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardLarge: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    height: 160,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    color: 'white',
    fontSize: 16,
  },
  textArea: {
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
    height: '100%',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
