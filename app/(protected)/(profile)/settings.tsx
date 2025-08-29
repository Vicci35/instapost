import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { searchStyle } from "@/styles/searchStyles";
import { useRouter } from "expo-router";
import EditProfile from "@/Screens/ProfileScreen/editProfilScreen";

export default function Search() {
  const router = useRouter();
  return (
    <SafeAreaView style={searchStyle.container}>
      <EditProfile />
      <TouchableOpacity
        onPress={() => router.push("/(protected)/(profile)/profile")}
      >
        <Text>Back to profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
