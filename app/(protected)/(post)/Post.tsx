import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { styles } from "@/styles/postStyles"; // kan skapa eget för postScreen om du vill

export default function Post() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();

  const BACKEND_URL =
    Platform.OS === "web"
      ? "http://localhost:3000"
      : "http://192.168.1.140:3000"; // byt till din IP

  // Välj bild från galleri
   const pickImage = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Inte tillgängligt på webben", "Välj bild stöds endast på mobil.");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Behörighet nekad", "Vi behöver tillgång till ditt galleri.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: true });
    if (!result.canceled) setImage(result.assets[0].uri);
  };


  // Ta en bild med kameran
 const takePhoto = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Inte tillgängligt på webben", "Kamera stöds endast på mobil.");
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Behörighet nekad", "Vi behöver tillgång till kameran.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 0.7, base64: true });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // Hämta geo-tag
  const getLocation = async () => {
    if (Platform.OS === "web") {
      Alert.alert("Inte tillgängligt på webben", "Geo-tag stöds endast på mobil.");
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Behörighet nekad", "Vi behöver din plats för geo-tag.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
  };

  // Skicka inlägget till backend
  const handlePost = async () => {
    if (!caption || !image) {
      Alert.alert("Fyll i bild och caption");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);
      if (location) {
        formData.append("lat", location.lat.toString());
        formData.append("lng", location.lng.toString());
      }

      const res = await fetch(`${BACKEND_URL}/posts`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.ok) throw new Error("Kunde inte posta");

      Alert.alert("Inlägget skickat!");
      router.push("/(protected)"); 
    } catch (error) {
      console.error(error);
      Alert.alert("Fel vid postning");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Skriv något..."
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Välj bild</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Ta foto</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getLocation} style={styles.button}>
          <Text style={styles.buttonText}>Geo-tag</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handlePost} style={styles.postButton}>
        <Text style={styles.postButtonText}>Posta</Text>
      </TouchableOpacity>
    </View>
  );
}
