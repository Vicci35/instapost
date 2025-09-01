// Login
import React, { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { sendCredentials } from "@/controllers/loginController";
import { UserContext } from "@/contexts/userContext";
import { styles } from "@/styles/loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Fel", "Fyll i både email och lösenord");
      return;
    }

    try {
      const platform = Platform.OS;
      const result = await sendCredentials(email, password, platform);

      if (!result) {
        Alert.alert("Fel", "Inloggningen misslyckades");
        return;
      }

      const { token, userData } = result;

      if (!token) {
        Alert.alert("Fel", "Inloggningen misslyckades");
        return;
      }

      if (platform !== "web") {
        await SecureStore.setItemAsync("userToken", token);
      }

      login(userData, token);

      Alert.alert("Inloggningen lyckades");
      router.push("/(protected)");
    } catch (err) {
      console.error("Login failed:", err);
      Alert.alert("Fel", "Något gick fel vid inloggningen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Logga In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.buttonText}>New user? Create account here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
