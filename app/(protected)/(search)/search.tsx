import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { searchStyle } from "@/styles/searchStyles";

// För fetch av posts:
// localhost:3000/search/user

export default function Search() {
  return (
    <SafeAreaView style={searchStyle.container}>
      <Text style={searchStyle.title}>Search user here</Text>
    </SafeAreaView>
  );
}
