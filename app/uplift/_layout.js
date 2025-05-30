import { Stack } from 'expo-router';

export default function UpliftLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: '#000', // keep consistent background
        },
      }}
    />
  );
}
