import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { useImage } from "@/contexts/imageContext";
import { editStyles } from "@/styles/editPostStyle";
import { UserContext } from "@/contexts/userContext";

export default function EditPost() {
  const router = useRouter();
  const { uri } = useImage();
  const [text, setText] = useState<string>("");
  const { user, token, setUser, logout } = useContext(UserContext);

  useEffect(() => {
    console.log("input:", text);
    console.log("name:", user.name);
    console.log("userId:", user._id);
  }, [text]);

  return (
    <SafeAreaView>
      <View style={editStyles.container}>
        <Image
          source={uri ? { uri } : undefined}
          contentFit="contain"
          style={{ height: 380, width: 380, aspectRatio: 1 }}
        />
        <Text>Edit this post</Text>
        <TextInput
          onChangeText={setText}
          style={editStyles.input}
          multiline
          maxLength={100}
        />

        <TouchableOpacity style={editStyles.button}>
          <Text style={editStyles.buttonText}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(protected)/(post)/Post")}
          style={editStyles.button}
        >
          <Text style={editStyles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
