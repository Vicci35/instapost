import { Stack } from "expo-router";
import { UserProvider } from "@/contexts/userContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserProvider>
  );
}
