import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useImage } from "@/contexts/imageContext";

export default function EditPost() {
  const router = useRouter();
  const { uri } = useImage();

  return (
    <SafeAreaView>
      <Image
        source={uri ? { uri } : undefined}
        contentFit="contain"
        style={{ height: 380, width: 380, aspectRatio: 1 }}
      />
      <Text>Edit this post</Text>
      <TouchableOpacity onPress={() => router.push("/(protected)/(post)/Post")}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
