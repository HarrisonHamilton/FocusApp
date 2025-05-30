import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SoundJourney() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Journey</Text>
      <Text style={styles.description}>
        Explore ambient sounds and relaxing vibrations here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#AAA',
  },
});
