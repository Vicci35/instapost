import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/protectedStyles";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Protected home</Text>
    </SafeAreaView>
  );
}
