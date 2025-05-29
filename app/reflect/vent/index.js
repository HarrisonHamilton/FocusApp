import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { VentContext } from '../../../contexts/VentContext';

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
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Give your vent a name..."
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Message</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Let it all out..."
        placeholderTextColor="#888"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Send to Orb" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100, // 👈 pushes all content lower on the screen
    backgroundColor: 'black',
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  textArea: {
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    height: 120,
    borderRadius: 6,
    marginBottom: 20,
  },
});
