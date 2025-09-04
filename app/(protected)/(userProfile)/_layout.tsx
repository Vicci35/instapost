// app/(protected)/(profile)/_layout.tsx
import { Stack } from "expo-router";

export default function UserProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
