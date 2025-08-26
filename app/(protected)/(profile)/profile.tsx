// app/protected/profile.tsx
import React from "react";

import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import ProfileScreen from "@/Screens/ProfileScreen/ProfileScreen";
import { handleLogout } from "@/controllers/logoutController";
import { styles } from "@/styles/protectedStyles";
import { Platform } from "react-native";

import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileScreen />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogout(router, Platform.OS, logout)}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
