// app/protected/profile.tsx
import React from "react";

import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import ProfileScreen from "@/Screens/ProfileScreen/ProfileScreen";
import { styles } from "@/styles/protectedStyles";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileScreen />
    </SafeAreaView>
  );
}
