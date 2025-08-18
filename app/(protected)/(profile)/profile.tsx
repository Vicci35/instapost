import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Protected profile</Text>
      {/* Log out option here  */}
    </View>
  );
}
