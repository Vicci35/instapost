// controllers/userController.ts
import { Platform } from "react-native";

export const updateProfile = async (
  token: string,
  name: string,
  bio: string,
  profilePic: string | File | null,
  platform: string
) => {
  const URL =

    platform === "web" ? "http://localhost:3000" : "http://192.168.1.198:3000";


  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    if (profilePic) {
      if (Platform.OS === "web") {
        console.log("🌐 Web: profilePic är en File:", profilePic);
        formData.append("profilePic", profilePic as File);
      } else {
        // React Native
        const uriParts = (profilePic as string).split(".");
        const fileType = uriParts[uriParts.length - 1].toLowerCase();
        const fileName = `profile.${fileType}`;
        const mimeType = fileType === "png" ? "image/png" : "image/jpeg";

        console.log("📱 React Native: profilePic URI:", profilePic);
        console.log("📱 Filnamn:", fileName, "MIME:", mimeType);

        formData.append("profilePic", {
          uri: (profilePic as string).replace("file://", ""),
          type: mimeType,
          name: fileName,
        } as any);
      }
    }

    console.log("📤 FormData ready to send:");
    // Skriv ut alla entries i FormData
    formData.forEach((value, key) => {
      console.log("  ", key, ":", value);
    });

    const response = await fetch(`${URL}/api/users/update-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Låt fetch sätta Content-Type själv
      },
      body: formData,
    });

    const data = await response.json();
    console.log("📥 Response from server:", data);

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Något gick fel vid uppdatering");
    }

    return data.user;
  } catch (err) {
    console.error("🔥 Fel i updateProfile:", err);
    return null;
  }
};
