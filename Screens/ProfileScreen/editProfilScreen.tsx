import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/editProfilStyles";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "@/contexts/userContext";
import { API_BASE_URL } from "../../config/api";

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Vi behöver tillgång till dina foton för att du ska kunna välja en profilbild."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setProfilePic(asset.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Vi behöver tillgång till kameran för att du ska kunna ta en profilbild."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setProfilePic(asset.uri);
    }
  };

  const handleSave = async () => {
    if (!token) {
      alert("Du är inte inloggad.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("bio", bio || "");

      const hasNewImage =
        profilePic &&
        typeof profilePic === "string" &&
        profilePic !== user?.profileImage &&
        !profilePic.startsWith("http");

      if (hasNewImage) {
        if (Platform.OS === "web") {
          const response = await fetch(profilePic);
          const blob = await response.blob();
          formData.append("file", blob, "profile.jpg");
        } else {
          const filename =
            profilePic.split("/").pop() || `profile_${Date.now()}.jpg`;
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("file", {
            uri: profilePic,
            type,
            name: filename,
          } as any);
        }
      }

      const res = await fetch(
        `${API_BASE_URL}/api/users/update/update-profile`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const responseText = await res.text();
      if (!res.ok)
        throw new Error(`Server error: ${res.status} - ${responseText}`);
      const result = JSON.parse(responseText);

      if (result.success && result.user) {
        setUser(result.user);
        router.push("/(protected)/(profile)/profile");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Kunde inte spara profil. Försök igen.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ ...styles.container, flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
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
              placeholderTextColor="#888"
            />

            <Text style={styles.label}>Bio</Text>
            <View style={{ minHeight: 100 }}>
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Skriv en bio.."
                style={[styles.input, styles.bioInput]}
                multiline
                placeholderTextColor="#888"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Spara ändringar</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
