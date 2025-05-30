
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const SLIDER_PADDING = 40;
const SLIDER_WIDTH = width - SLIDER_PADDING * 2;
const THUMB_SIZE = 36;

function EmotionSlider({ label, emojiMap, value, setValue }) {
  const animatedValue = new Animated.Value(value);
  const [emojiIndex, setEmojiIndex] = useState(-1);

  const handleValueChange = (val) => {
    setValue(val);
    animatedValue.setValue(val);
    const index = getEmojiIndex(val);
    if (index !== emojiIndex) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setEmojiIndex(index);
    }
  };

  const getEmojiIndex = (val) => {
    if (val < 0.2) return 0;
    if (val < 0.4) return 1;
    if (val < 0.6) return 2;
    if (val < 0.8) return 3;
    return 4;
  };

  const getEmoji = (val) => emojiMap[getEmojiIndex(val)];

  const position = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-THUMB_SIZE / 4, SLIDER_WIDTH - THUMB_SIZE + THUMB_SIZE / 4],
    extrapolate: 'clamp',
  });

  const animatedScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.sliderBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.sliderWrapper}>
        <View style={{ width: SLIDER_WIDTH }}>
          <Slider
            style={styles.slider}
            value={value}
            onValueChange={handleValueChange}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            minimumTrackTintColor="#999"
            maximumTrackTintColor="#444"
            thumbTintColor="transparent"
          />
          <Animated.View
            pointerEvents="none"
            style={[
              styles.emojiThumb,
              {
                transform: [{ translateX: position }, { scale: animatedScale }],
              },
            ]}
          >
            <Text style={styles.emojiText}>{getEmoji(value)}</Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default function EmotionsScreen() {
  const [happiness, setHappiness] = useState(0.5);
  const [anxiety, setAnxiety] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.header}>Log Your Emotions</Text>

        <EmotionSlider
          label="Happiness"
          emojiMap={['😭', '😢', '😐', '🙂', '😁']}
          value={happiness}
          setValue={setHappiness}
        />
        <EmotionSlider
          label="Anxiety"
          emojiMap={['😌', '😟', '😣', '😫', '😱']}
          value={anxiety}
          setValue={setAnxiety}
        />
        <EmotionSlider
          label="Energy"
          emojiMap={['💤', '😴', '😌', '😃', '⚡️']}
          value={energy}
          setValue={setEnergy}
        />

        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/reflect/emotionHelp',
              params: {
                happiness: happiness.toFixed(2),
                anxiety: anxiety.toFixed(2),
                energy: energy.toFixed(2),
              },
            })
          }
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    paddingBottom: 40,
    justifyContent: 'space-around',
  },
  header: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  sliderBlock: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  sliderWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: SLIDER_WIDTH,
    height: 40,
    zIndex: 0,
  },
  emojiThumb: {
    position: 'absolute',
    top: 0,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  emojiText: {
    fontSize: 28,
  },
  button: {
    backgroundColor: 'skyblue',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
