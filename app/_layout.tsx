import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index.tsx" />
      <Stack.Screen name="screens" />
    </Stack>
  );
}
