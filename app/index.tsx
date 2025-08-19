// Login
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "@/styles/loginStyles";

export default function LoginScreen() {
  const [token, setToken] = useState(true);
  const router = useRouter();

  // Use fetch to see if token exists or not
  // Choose path depending on state

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        router.replace("/(protected)");
      } else {
        router.replace("/login");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="spinner" size={50} color="blue" />
    </SafeAreaView>
  );
}
