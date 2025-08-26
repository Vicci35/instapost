// app/protected/profile.tsx
import React from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import ProfileScreen from "@/Screens/ProfileScreen/ProfileScreen";
import { handleLogout } from "@/controllers/logoutController";
import { styles } from "@/styles/protectedStyles";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileScreen />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogout(router)}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
