// Register
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { signupUser } from "@/controllers/signupController";
import { checkInput } from "@/util/validators";
import { styles } from "../../styles/registerStyle";

export default function RegisterScreen() {
  const [newUser, setUser] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();

  async function handleSignup() {
    const allFilled = Object.values(newUser).every(
      (value) => value.trim() !== ""
    );

    for (const [field, value] of Object.entries(newUser)) {
      const result = checkInput(field, value, newUser);
      if (!result.valid) {
        console.error(result.message);
        return;
      }
    }

    if (allFilled) {
      // Send to server
      await signupUser(newUser, Platform.OS);
      setUser({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
      });
      router.push("/login");
    } else {
      console.error("Fyll i alla fält!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#333" // <- gör placeholder mörkgrå/svart
        value={newUser.email}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, email: text }))
        }
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#333"
        value={newUser.username}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, username: text }))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#333"
        value={newUser.password}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Repeat password"
        placeholderTextColor="#333"
        value={newUser.repeatPassword}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, repeatPassword: text }))
        }
        secureTextEntry
      />

      {/* Submit */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>

      {/* To login */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Already have an account?</Text>
        <Text style={styles.buttonText}>Login here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
