import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function DraggableVent({ id, title, orbCenter, onDropNearOrb }) {
  const startX = useSharedValue(Math.random() * width);
  const startY = useSharedValue(Math.random() * height * 0.4 + height * 0.3);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const isDragging = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
      isDragging.value = true;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
    },
    onEnd: () => {
      isDragging.value = false;

      const x = startX.value + translateX.value;
      const y = startY.value + translateY.value;

      const dx = x - orbCenter.x;
      const dy = y - orbCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < orbCenter.radius * 1.1) {
        runOnJS(onDropNearOrb)(id);
      } else {
        // Snap back
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    // Magnetic pull effect
    const x = startX.value + translateX.value;
    const y = startY.value + translateY.value;

    const dx = orbCenter.x - x;
    const dy = orbCenter.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const pullStrength = Math.min(1, 200 / distance);

    const curvedX = translateX.value + dx * 0.05 * pullStrength;
    const curvedY = translateY.value + dy * 0.05 * pullStrength;

    return {
      position: 'absolute',
      left: startX.value,
      top: startY.value,
      transform: [{ translateX: curvedX }, { translateY: curvedY }],
      opacity: isDragging.value ? 1 : 0.95,
      zIndex: isDragging.value ? 999 : 1,
    };
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.vent, animatedStyle]}>
          <Text style={styles.ventText}>{title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  vent: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#222',
    borderRadius: 24,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  ventText: {
    color: '#eaffff',
    fontSize: 16,
  },
});
