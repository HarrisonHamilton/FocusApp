import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UpliftScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('game1')}>
        <Text style={styles.text}>Game/Task 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => {}}>
        <Text style={styles.text}>Game/Task 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => {}}>
        <Text style={styles.text}>Game/Task 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', padding: 20 },
  box: {
    backgroundColor: '#222',
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
  },
  text: { color: 'white', fontSize: 18, textAlign: 'center' },
});
