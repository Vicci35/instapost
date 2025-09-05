import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { useImage } from "@/contexts/imageContext";
import { editStyles } from "@/styles/editPostStyle";
import { UserContext } from "@/contexts/userContext";
import { handleNewPost } from "@/controllers/ImageController";

export default function EditPost() {
  const router = useRouter();
  const { uri } = useImage();
  const [caption, setCaption] = useState<string>("");
  const { user, token, setUser, logout } = useContext(UserContext);
  const platform = Platform.OS;

  const saveAndReturn = async () => {
    if (!user) {
      console.error("No user found. Could not post.");
    }

    await handleNewPost(
      caption,
      user.name,
      user._id,
      uri,
      platform,
      user.profileImageUrl
    );
    router.push("/");
  };

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
          onChangeText={setCaption}
          style={editStyles.input}
          multiline
          maxLength={100}
        />

        <TouchableOpacity style={editStyles.button} onPress={saveAndReturn}>
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
