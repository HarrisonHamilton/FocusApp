// app/_layout.js
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VentProvider from '../contexts/VentContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <VentProvider>
          <Tabs
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: { backgroundColor: '#000', borderTopColor: '#222' },
              tabBarActiveTintColor: 'deepskyblue',
              tabBarInactiveTintColor: 'gray',
              gestureEnabled: true,
              tabBarIcon: ({ color, size }) => {
                let iconName;

                switch (route.name) {
                  case 'reflect':
                    iconName = 'sparkles-outline';
                    break;
                  case 'uplift':
                    iconName = 'chatbubbles-outline';
                    break;
                  case 'index':
                    iconName = 'radio-outline';
                    break;
                  case 'explore':
                    iconName = 'search-outline';
                    break;
                  case 'you':
                    iconName = 'person-outline';
                    break;
                  default:
                    iconName = 'ellipse-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tabs.Screen name="reflect" options={{ title: 'Reflect' }} />
            <Tabs.Screen name="uplift" options={{ title: 'Uplift' }} />
            <Tabs.Screen name="index" options={{ title: 'Orb' }} />
            <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
            <Tabs.Screen name="you" options={{ title: 'You' }} />
          </Tabs>
        </VentProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
