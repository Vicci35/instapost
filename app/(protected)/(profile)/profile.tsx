import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { handleLogout } from "@/controllers/logoutController";
import { styles } from "@/styles/protectedStyles";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Protected profile</Text>

      {/* Log out option here  */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogout(router)}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
