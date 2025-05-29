import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const ORB_RADIUS = 75;
const ORB_X = width / 2;
const ORB_Y = height / 2;

export default function DraggableVent({ title, onDropNearOrb }) {
  const x = useSharedValue(width / 2 - 50); // spawn in center-ish
  const y = useSharedValue(height / 4);     // quarter down the screen

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      const dx = x.value - ORB_X;
      const dy = y.value - ORB_Y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < ORB_RADIUS + 40) {
        runOnJS(onDropNearOrb)(title, x.value, y.value);
      }
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
    ],
    position: 'absolute',
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.bubble, style]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
