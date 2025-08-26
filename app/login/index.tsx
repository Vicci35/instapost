// Login
import React, { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { sendCredentials, fetchUserData } from "@/controllers/loginController";
import { UserContext } from "@/contexts/userContext";
import { styles } from "@/styles/loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const router = useRouter();

  // Add login controller
  const handleLogin = async () => {
    console.log("Sending credentials");
    if (email && password) {
      const token = await sendCredentials(email, password, Platform.OS);
      const userData = await fetchUserData(email, password, Platform.OS);

      if (token) {
        if (Platform.OS !== "web") {
          await SecureStore.setItemAsync("userToken", token);
        }

        login(userData, token);

        Alert.alert("Inloggningen lyckades");
        router.push({ pathname: "/(protected)" });
      } else {
        console.error("Could not log in");
      }
    } else {
      Alert.alert("Fel");
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
