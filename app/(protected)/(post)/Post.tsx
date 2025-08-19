import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/protectedStyles";

export default function Post() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>New post</Text>
    </SafeAreaView>
  );
}
