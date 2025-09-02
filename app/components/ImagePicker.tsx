import * as ImagePicker from "expo-image-picker";
import { Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Let user pick images from gallery
const requestGalleryPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission denied",
      "You need to allow gallery access to pick images"
    );
    return false;
  }
  return true;
};

const pickImage = async ({
  setUri,
}: {
  setUri: (uri: string | null) => void;
}) => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setUri(result.assets[0].uri);
  }
};

export const PickImage = ({
  setUri,
}: {
  setUri: (uri: string | null) => void;
}) => {
  const handlePress = () => {
    pickImage({ setUri });
  };

  return (
    <TouchableOpacity style={{ marginTop: 10 }} onPress={handlePress}>
      <FontAwesome name="image" size={80} color="#1da0f261" />
    </TouchableOpacity>
  );
};
