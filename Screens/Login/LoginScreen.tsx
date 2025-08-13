import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      Alert.alert("Inloggningen lyckades");
    } else {
      Alert.alert("Fel");
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
