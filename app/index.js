import React from 'react';
import { View, Text } from 'react-native';
import Orb from '../components/Orb';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Orb />
      <Text style={{ marginTop: 20, fontSize: 18 }}>Welcome to Focus!</Text>
    </View>
  );
}

