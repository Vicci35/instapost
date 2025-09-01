import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { searchStyle } from "@/styles/searchStyles";
import { useRouter } from "expo-router";

export default function Search() {
  const router = useRouter();
  return (
    <SafeAreaView style={searchStyle.container}>
      <Text style={searchStyle.title}>Edit here</Text>
      <TouchableOpacity
        onPress={() => router.push("/(protected)/(profile)/profile")}
      >
        <Text>Back to profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
