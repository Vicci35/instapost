// Register
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Register account</Text>

      <TouchableOpacity style={styles.button}>Login</TouchableOpacity>
      <TouchableOpacity style={styles.button}>Create account</TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "#1DA1F2",
    borderRadius: 12,
  },
});
