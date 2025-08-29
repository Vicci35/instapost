import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/editProfilStyles";
import * as ImagePicker from "expo-image-picker";

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
    try {
      if (!token) throw new Error("Ingen token hittades, logga in igen");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);

      if (profilePic && !profilePic.startsWith("http")) {
        const uriParts = profilePic.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("profilePic", {
          uri: profilePic,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      const response = await fetch(
        "http://192.168.1.198:3000/api/users/update-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Något gick fel");
      }
      const data = await response.json();
      setUser(data.user);
      router.push("/(protected)/(profile)/profile");
      console.log("Profil sparad!");
    } catch (error) {
      console.error("Fel vid sparande:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Redigera Profil</Text>

      <TouchableOpacity onPress={pickImage}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <View style={styles.placeholderPic}>
            <Text>Välj bild</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
        <Text style={styles.cameraButtonText}>Ta foto</Text>
      </TouchableOpacity>

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
