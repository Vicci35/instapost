import React, { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../../styles/loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.eyeButton}
      >
        <Text>{showPassword ? "🙈" : "👁️"}</Text>
      </TouchableOpacity>
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Register New Account" />
    </View>
  );
}
