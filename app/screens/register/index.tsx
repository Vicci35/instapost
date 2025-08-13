import React, { useState, useEffect } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { styles } from "../register/RegisterStyle";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga In</Text>
      <Text style={styles.title}>Bajs</Text>

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
      <Button title="Log In" />
      <Button title="Register New Account" />
    </View>
  );
}
