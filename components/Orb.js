import React from 'react';
import { View } from 'react-native';

const Orb = () => {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#5A67D8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
      }}
    />
  );
};

export default Orb;
