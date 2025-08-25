// app/protected/profile.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "@/styles/protectedStyles";
import ProfileScreen from "@/Screens/ProfileScreen/ProfileScreen";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export default function Profile() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Profilen */}
      <ProfileScreen />
    </SafeAreaView>
  );
}
