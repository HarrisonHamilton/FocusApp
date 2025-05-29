import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReflectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Reflect</Text>

        <TouchableOpacity style={styles.optionBox} onPress={() => router.push('/reflect/vent')}>
          <Text style={styles.optionText}>Venting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox} onPress={() => router.push('/reflect/journal')}>
          <Text style={styles.optionText}>Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox} onPress={() => router.push('/reflect/emotions')}>
          <Text style={styles.optionText}>Emotions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionBox: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
  },
});
