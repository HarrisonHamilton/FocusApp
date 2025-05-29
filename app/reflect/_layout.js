// app/reflect/_layout.js
import { Stack } from 'expo-router';

export default function ReflectLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
        headerShown: false,
      }}
    />
  );
}
