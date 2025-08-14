import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { routeToScreen } from "expo-router/build/useScreens";

// Starting page
export default function RootScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to instapost</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/register")}
      >
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 12,
    width: 250,
    margin: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
