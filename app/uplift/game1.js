import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Game1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Game/Task 1 placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 20 },
});
