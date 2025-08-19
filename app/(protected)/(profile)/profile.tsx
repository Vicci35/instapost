// app/protected/profile.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { handleLogout } from "@/controllers/logoutController";
import { styles } from "@/styles/protectedStyles";
import ProfileScreen from "@/Screens/ProfileScreen/ProfileScreen";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Profilen */}
      <ProfileScreen />

      {/* Log out knapp under profilen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogout(router)}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
