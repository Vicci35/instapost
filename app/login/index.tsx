// Login
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "@/styles/loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Add login controller

  const handleLogin = () => {
    console.log(email, password);
    if (email && password) {
      console.log("log in");
      Alert.alert("Inloggningen lyckades");
      // Needs protecc
      router.push({ pathname: "/(protected)" });
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
