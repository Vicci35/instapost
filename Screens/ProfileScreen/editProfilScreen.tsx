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
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        console.log("Image picked:", asset);

        if (Platform.OS === "web") {
          setProfilePic(asset.uri);
        } else {
          const uri = asset.uri;
          setProfilePic(uri);
          console.log("Set profile pic URI:", uri);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Kunde inte välja bild. Försök igen.");
    }
  };

  const takePhoto = async () => {
    try {
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
        console.log("Photo taken:", asset);
        setProfilePic(asset.uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      alert("Kunde inte ta foto. Försök igen.");
    }
  };

  const handleSave = async () => {
    if (!token) {
      alert("Du är inte inloggad.");
      return;
    }

    try {
      console.log("=== STARTING SAVE PROCESS ===");
      console.log("Name:", name);
      console.log("Bio:", bio);
      console.log("Profile pic:", profilePic);
      console.log("User current image:", user?.profileImage);
      console.log("Platform:", Platform.OS);

      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("bio", bio || "");

      const hasNewImage =
        profilePic &&
        typeof profilePic === "string" &&
        profilePic !== user?.profileImage &&
        !profilePic.startsWith("http");

      console.log("Has new image:", hasNewImage);

      if (hasNewImage) {
        if (Platform.OS === "web") {
          try {
            const response = await fetch(profilePic);
            const blob = await response.blob();
            formData.append("file", blob, "profile.jpg");
            console.log("Web: Added blob to formData, size:", blob.size);
          } catch (error) {
            console.error("Error converting web image:", error);
            alert("Kunde inte bearbeta bilden. Försök igen.");
            return;
          }
        } else {
          const filename =
            profilePic.split("/").pop() || `profile_${Date.now()}.jpg`;
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          const fileObject = {
            uri: profilePic,
            type: type,
            name: filename,
          };

          formData.append("file", fileObject as any);
          console.log("React Native: Added file to formData", {
            filename,
            type,
            uri: profilePic,
          });
        }
      }

      console.log("Sending request to server...");

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

      console.log("Response status:", res.status);

      const responseText = await res.text();
      console.log("Response text:", responseText);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} - ${responseText}`);
      }

      const result = JSON.parse(responseText);
      console.log("Parsed result:", result);

      if (result.success && result.user) {
        setUser(result.user);
        console.log(" Profile updated successfully!");
        console.log("New profile image:", result.user.profileImage);
        router.push("/(protected)/(profile)/profile");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error(" Error saving profile:", err);
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
