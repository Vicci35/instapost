// Register
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "../../styles/registerStyle";

export default function RegisterScreen() {
  const [newUser, setUser] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();

  function handleSignup() {
    const allFilled = Object.values(newUser).every(
      (value) => value.trim() !== ""
    );

    if (allFilled) {
      console.log(newUser);
    } else {
      console.error("Fyll i alla fält!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register account</Text>
      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newUser.email}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, email: text }))
        }
        keyboardType="email-address"
      />

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={newUser.username}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, username: text }))
        }
        keyboardType="email-address"
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={newUser.password}
        onChangeText={(text: string) =>
          setUser((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry
      />

      {/* Repeat Password */}
      <TextInput
        style={styles.input}
        placeholder="Repeat password"
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
