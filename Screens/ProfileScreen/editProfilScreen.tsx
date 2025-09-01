import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import styles from "../../styles/editProfilStyles";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../util/firebaseConfig";

// FIX: blob måste anropas som en funktion (.blob()), inte bara .blob
// FIX: saknade backticks runt path
const uploadImage = async (uri: string, userId: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, `profilePics/${userId}.jpg`);
  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Hej! Följ mig @bestfriend");
  const [profilePic, setProfilePic] = useState<string | null>(null);

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
      let imageURL = profilePic;
      if (profilePic) {
        imageURL = await uploadImage(profilePic, "12345");
      }

      await fetch("http://localhost:3000/api/users/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // FIX: måste vara en sträng
          Authorization: `Bearer DITT_TOKEN`,
        },
        body: JSON.stringify({
          name,
          bio,
          profilePic: imageURL,
        }),
      });

      console.log("Profil sparad!");
      router.back();
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
