// app/you/_layout.js
import { Stack } from 'expo-router';

export default function YouLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
        headerShown: false, // hide top nav if you don't want it
      }}
    />
  );
}
