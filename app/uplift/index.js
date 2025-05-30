import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const experiences = [
  {
    title: 'Breath',
    description: 'A calming breath cycle',
    icon: 'cloud-outline',
    route: '/uplift/breath',
  },
  {
    title: 'Light Experience',
    description: 'Play with ambient light',
    icon: 'flashlight-outline',
    route: '/uplift/lightExperience',
  },
  {
    title: 'Sound Journey',
    description: 'Explore sounds & vibrations',
    icon: 'musical-notes-outline',
    route: '/uplift/soundJourney',
  },
];

export default function UpliftHome() {
  const router = useRouter();

  const handlePress = (route) => {
    Haptics.selectionAsync();
    router.push(route);
  };

  const renderCard = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={() => handlePress(item.route)}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={item.icon} size={24} color="#fff" />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Uplift</Text>
      <FlatList
        data={experiences}
        keyExtractor={(item) => item.title}
        renderItem={renderCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  iconWrapper: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#AAAAAA',
  },
});
