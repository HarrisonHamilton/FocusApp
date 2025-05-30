import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, Vibration } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  withRepeat,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { VentContext } from '../contexts/VentContext';
import DraggableVent from '../components/DraggableVent';
import * as Haptics from 'expo-haptics';

const ORB_SIZE = 160;
const PARTICLE_COUNT = 100;
const EXPLOSION_COUNT = 35;
const { width, height } = Dimensions.get('window');

export default function Index() {
  const { vents, removeVent } = useContext(VentContext);
  const orbRef = useRef(null);
  const [orbCenter, setOrbCenter] = useState(null);
  const [exploding, setExploding] = useState(false);

  const glowColor = useSharedValue(0);
  const orbColor = useSharedValue(0);
  const orbScale = useSharedValue(1);
  const screenShake = useSharedValue(0);
  const idleScaleX = useSharedValue(1);
  const idleScaleY = useSharedValue(1);
  const dragX = useSharedValue(null);
  const dragY = useSharedValue(null);


  React.useEffect(() => {
    startMorphLoop();
  }, []);

  function startMorphLoop() {
    const nextX = 0.98 + Math.random() * 0.04; // stays between 0.98 - 1.02
    const nextY = 0.98 + Math.random() * 0.04;
    const duration = 800 + Math.random() * 600; // duration between 800 - 1400ms
  
    idleScaleX.value = withTiming(nextX, { duration });
    idleScaleY.value = withTiming(nextY, { duration }, () => {
      runOnJS(startMorphLoop)(); // keep it looping
    });
  }
  
  

  const glowStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      glowColor.value,
      [0, 1],
      ['#00f0ff22', '#ff2d2d33']
    );
    const shadowColor = interpolateColor(
      glowColor.value,
      [0, 1],
      ['#00f0ff', '#ff2d2d']
    );
    return { backgroundColor, shadowColor };
  });

  const orbAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      orbColor.value,
      [0, 1],
      ['#eaffff', '#ff3b3b']
    );
  
    let dx = 0;
    let dy = 0;
    let stretch = 1;
  
    if (dragX.value !== null && dragY.value !== null && orbCenter) {
      const deltaX = dragX.value - orbCenter.x;
      const deltaY = dragY.value - orbCenter.y;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  
      const pullThreshold = 150; // How far before orb reacts
      if (distance < pullThreshold) {
        const stretchFactor = 1 + (1 - distance / pullThreshold) * 0.07;
        dx = (deltaX / distance) * 5;
        dy = (deltaY / distance) * 5;
        stretch = stretchFactor;
      }
    }
  
    return {
      backgroundColor,
      transform: [
        { translateX: dx },
        { translateY: dy },
        { scaleX: idleScaleX.value * stretch },
        { scaleY: idleScaleY.value * stretch },
        { scale: orbScale.value },
      ],
    };
  });
  

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: screenShake.value }],
  }));

  const triggerGlowFlash = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, 100);
  
  if (Platform.OS === 'android') {
     Vibration.vibrate([0, 150, 50, 200]);
  }


    screenShake.value = withSequence(
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(-4, { duration: 40 }),
      withTiming(4, { duration: 40 }),
      withTiming(-2, { duration: 30 }),
      withTiming(2, { duration: 30 }),
      withTiming(0, { duration: 30 })
    );

    orbScale.value = withTiming(1.25, { duration: 180 }, () => {
      orbScale.value = withSequence(
        withTiming(1.05, { duration: 120 }),
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 200 })
      );
    });

    glowColor.value = withTiming(1, { duration: 180 });
    orbColor.value = withTiming(1, { duration: 180 });

    setExploding(true);
    setTimeout(() => {
      glowColor.value = withTiming(0, { duration: 700 });
      orbColor.value = withTiming(0, { duration: 700 });
      setExploding(false);
    }, 1000);
  };
  return (
    <Animated.View style={[{ flex: 1 }, shakeStyle]}>
      <View style={styles.container}>
        {orbCenter && (
          <>
            <AmbientParticles count={PARTICLE_COUNT} radius={ORB_SIZE / 1.5} center={orbCenter} />
            {exploding && <ExplosionParticles count={EXPLOSION_COUNT} center={orbCenter} />}
          </>
        )}

        <Animated.View
          style={[
            styles.orbGlow,
            glowStyle,
            {
              position: 'absolute',
              top: height / 2 - ORB_SIZE / 2,
              left: width / 2 - ORB_SIZE / 2,
            },
          ]}
        >
          <Animated.View
            ref={orbRef}
            onLayout={() => {
              requestAnimationFrame(() => {
                orbRef.current?.measureInWindow((x, y, w, h) => {
                  if (w && h) {
                    setOrbCenter({
                      x: x + w / 2,
                      y: y + h / 2,
                      radius: w / 2,
                    });
                  }
                });
              });
            }}
            style={[styles.orb, orbAnimatedStyle]}
          />
        </Animated.View>

        {orbCenter &&
          vents.map((vent) => (
            <DraggableVent
              key={vent.id}
              id={vent.id}
              title={vent.title}
              orbCenter={orbCenter}
              onDropNearOrb={(id) => {
                triggerGlowFlash();
                setTimeout(() => {
                  removeVent(id);
                }, 200);
              }}
            />
          ))}
      </View>
    </Animated.View>
  );
}

function AmbientParticles({ count = 100, radius, center }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <SingleParticle key={i} center={center} radius={radius} />
      ))}
    </View>
  );
}

function SingleParticle({ center, radius }) {
  const angle = Math.random() * 2 * Math.PI;
  const dist = radius * (1.05 + Math.random() * 0.2);
  const baseX = Math.cos(angle) * dist;
  const baseY = Math.sin(angle) * dist;

  const size = 1.5 + Math.random() * 1.5;
  const dx = Math.random() * 14 - 7;
  const dy = Math.random() * 14 - 7;
  const duration = 600 + Math.random() * 400;

  const x = useSharedValue(center.x + baseX);
  const y = useSharedValue(center.y + baseY);

  React.useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(center.x + baseX + dx, { duration }),
        withTiming(center.x + baseX, { duration })
      ),
      -1,
      true
    );
    y.value = withRepeat(
      withSequence(
        withTiming(center.y + baseY + dy, { duration }),
        withTiming(center.y + baseY, { duration })
      ),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: x.value }, { translateY: y.value }],
    opacity: 0.6,
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#eaffff',
          shadowColor: '#eaffff',
          shadowRadius: size * 2,
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}
    />
  );
}

function ExplosionParticles({ count = 35, center }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <ExplosionParticle key={i} center={center} />
      ))}
    </View>
  );
}

function ExplosionParticle({ center }) {
  const angle = Math.random() * 2 * Math.PI;
  const distance = 350 + Math.random() * 250;
  const offsetX = Math.cos(angle) * distance;
  const offsetY = Math.sin(angle) * distance;
  const duration = 900 + Math.random() * 400;

  const x = useSharedValue(center.x);
  const y = useSharedValue(center.y);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    x.value = withTiming(center.x + offsetX, { duration });
    y.value = withTiming(center.y + offsetY, { duration });
    opacity.value = withTiming(0, { duration });
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: x.value }, { translateY: y.value }],
    opacity: opacity.value,
  }));

  const size = 8 + Math.random() * 5;

  return (
    <>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#FF6B6B',
            shadowColor: '#FF6B6B',
            shadowRadius: 14,
            shadowOpacity: 0.7,
            shadowOffset: { width: 0, height: 0 },
          },
          style,
        ]}
      />
      <TrailParticle startX={center.x} startY={center.y} dx={offsetX} dy={offsetY} delay={60} />
      <TrailParticle startX={center.x} startY={center.y} dx={offsetX} dy={offsetY} delay={120} />
    </>
  );
}

function TrailParticle({ startX, startY, dx, dy, delay }) {
  const x = useSharedValue(startX);
  const y = useSharedValue(startY);
  const opacity = useSharedValue(0.8);

  React.useEffect(() => {
    const duration = 600;
    setTimeout(() => {
      x.value = withTiming(startX + dx * 0.85, { duration });
      y.value = withTiming(startY + dy * 0.85, { duration });
      opacity.value = withTiming(0, { duration });
    }, delay);
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ translateX: x.value }, { translateY: y.value }],
    opacity: opacity.value,
  }));

  const size = 4 + Math.random() * 3;

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#FFD166',
          shadowColor: '#FF9933',
          shadowRadius: 10,
          shadowOpacity: 0.6,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020614',
  },
  orbGlow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 60,
      },
      android: {
        elevation: 24,
      },
    }),
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
  },
});

