// Login
import React, { useState } from "react";
import { Alert, Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { styles } from "./loginStyles";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Add login controller

  const handleLogin = () => {
    console.log(email, password);
    if (email && password) {
      Alert.alert("Inloggningen lyckades");
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
