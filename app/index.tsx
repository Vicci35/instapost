// Login
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { styles } from "@/styles/loginStyles";

export default function LoginScreen() {
  const [token, setToken] = useState(false);
  const router = useRouter();

  // Use fetch to see if token exists or not
  // Choose path depending on token state

  useEffect(() => {
    const checkToken = async () => {
      let hasToken = false;

      if (Platform.OS !== "web") {
        const savedToken = await SecureStore.getItemAsync("userToken");
        hasToken = !!savedToken;
      } else {
        try {
          const response = await fetch("http://localhost:3000/gate/token", {
            method: "GET",
            credentials: "include", // skicka cookies
          });
          if (response.ok) {
            const data = await response.json();
            hasToken = !!data.user; // beroende på hur backend svarar
          }
        } catch (error) {
          console.error("Token check failed:", error);
        }
      }

      if (hasToken) {
        router.replace("/(protected)");
      } else {
        router.replace("/login");
      }
    };

    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FontAwesome name="spinner" size={50} color="blue" />
    </SafeAreaView>
  );
}
