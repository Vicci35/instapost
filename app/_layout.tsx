import { Stack } from "expo-router";
import { UserProvider } from "@/contexts/userContext";
import { ImageProvider } from "@/contexts/imageContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <ImageProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ImageProvider>
    </UserProvider>
  );
}
