import { useLocalSearchParams } from "expo-router";
import UserProfileScreen from "@/Screens/ProfileScreen/UserProfileScreen";
import { styles } from "@/styles/protectedStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileWrapper() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  console.log("UserId fron URL:", userId);

  if (!userId) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserProfileScreen userId={userId} />
    </SafeAreaView>
  );
}
