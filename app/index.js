import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { VentContext } from '../contexts/VentContext';
import DraggableVent from '../components/DraggableVent';
import 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const ORB_RADIUS = 75;

export default function OrbScreen() {
  const { vents, removeVent } = useContext(VentContext);
  const orbX = width / 2;
  const orbY = height / 2;

  const checkDrop = (title, x, y) => {
    const dx = x - orbX;
    const dy = y - orbY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ORB_RADIUS + 40) {
      removeVent(title);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.orb} />
      {vents.map((vent) => (
        <DraggableVent
          key={vent}
          title={vent}
          onDropNearOrb={checkDrop}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  orb: {
    width: ORB_RADIUS * 2,
    height: ORB_RADIUS * 2,
    borderRadius: ORB_RADIUS,
    backgroundColor: 'deepskyblue',
    position: 'absolute',
    top: height / 2 - ORB_RADIUS,
    left: width / 2 - ORB_RADIUS,
  },
});
