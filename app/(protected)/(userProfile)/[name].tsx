import { useLocalSearchParams } from "expo-router";
import UserProfileScreen from "../../../Screens/ProfileScreen/UserProfileScreen";
import { styles } from "@/styles/protectedStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileByUsername() {
  const { name } = useLocalSearchParams<{ name: string }>();
  console.log("Username from URL:", name);

  if (!name) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserProfileScreen name={name} />
    </SafeAreaView>
  );
}
