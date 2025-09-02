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
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "@/controllers/userController";

import { UserContext } from "@/contexts/userContext";

export default function EditProfile() {
  const router = useRouter();
  const { user, token, setUser } = useContext(UserContext);
  console.log("Context i editprofile:", { user, token });

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

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
      setProfilePic(result.assets[0].uri);
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
    if (!token) throw new Error("Ingen token hittades. logga in igen");

    try {
      const updatedUser = await updateProfile(token, name, bio, profilePic);

      if (!updatedUser) throw new Error("Misslyckades med att spara profil");

      setUser(updatedUser);
      router.push("/(protected)/(profile)/profile");
      console.log("Profil sparad!");
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
        placeholder="Skriv en bio.. (@ för att länka till konto)"
        style={[styles.input, styles.bioInput]}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Spara ändringar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
