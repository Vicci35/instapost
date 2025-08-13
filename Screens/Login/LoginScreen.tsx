import React, { useState, useEffect } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { styles } from "./LoginScreen.styles";
import { sendCredentials } from "@/controllers/loginController";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Sending information");
    console.log(email, password);
    if (!email || !password) {
      Alert.alert("Fyll i alla fält!");
      return;
    }

    const result = await sendCredentials(email, password);

    if (result) {
      Alert.alert("Inloggningen lyckades");
    } else {
      Alert.alert("Fel");
      return;
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Register New Account" />
    </View>
  );
}
