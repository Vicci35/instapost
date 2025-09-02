import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/editProfilStyles";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "@/controllers/userController";
import { UserContext } from "@/contexts/userContext";

export default function EditProfile() {
  const router = useRouter();
  const { user, token, setUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<string | File | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setProfilePic(user.profileImage || null);
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri =
        Platform.OS === "web"
          ? result.assets[0].uri
          : result.assets[0].uri.replace("file://", "");
      setProfilePic(uri);
      console.log("Picked image URI:", uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };
  const handleSave = async () => {
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);

      if (profilePic) {
        if (typeof profilePic === "string") {
          formData.append("file", {
            uri: profilePic.startsWith("file://")
              ? profilePic
              : "file://" + profilePic,
            type: "image/jpeg",
            name: "profile.jpg",
          } as any);
        } else {
          formData.append("file", profilePic);
        }
      }

      const res = await fetch(
        "http://localhost:3000/api/users/update-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Misslyckades med att spara profil");
      }

      const updatedUser = await res.json();
      setUser(updatedUser.user);
      router.push("/(protected)/(profile)/profile");
    } catch (err) {
      console.error("Fel vid sparande:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Redigera Profil</Text>

      <Image
        source={
          profilePic
            ? { uri: profilePic }
            : require("../../assets/images/defaultBildProfil.jpg")
        }
        style={styles.profilePic}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraButtonText}>Ta foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Text style={styles.cameraButtonText}>Välj från bibliotek</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Namn</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ange namn"
        style={styles.input}
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Skriv en bio.."
        style={[styles.input, styles.bioInput]}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Spara ändringar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
