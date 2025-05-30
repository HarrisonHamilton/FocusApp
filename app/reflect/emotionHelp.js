
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function EmotionHelp() {
  const { happiness, anxiety, energy } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Emotion Summary</Text>
      <Text style={styles.item}>Happiness: {happiness}</Text>
      <Text style={styles.item}>Anxiety: {anxiety}</Text>
      <Text style={styles.item}>Energy: {energy}</Text>

      {/* You can later add personalized tips or resources based on these values */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});
