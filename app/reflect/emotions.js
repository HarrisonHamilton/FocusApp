// app/reflect/emotions.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';

export default function EmotionsScreen() {
  const [value, setValue] = useState(50);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.label}>How are you feeling?</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="deepskyblue"
          maximumTrackTintColor="#888"
          thumbTintColor="white"
        />
        <Text style={styles.valueText}>Intensity: {Math.round(value)}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
  },
  slider: {
    width: '100%',
  },
  valueText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
});
