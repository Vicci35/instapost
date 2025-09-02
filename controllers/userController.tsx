import { Platform } from "react-native";

export const updateProfile = async (
  token: string,
  name: string,
  bio: string,
  profilePic: string | null,
  platform: string
) => {
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.198:3000";

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    if (profilePic && !profilePic.startsWith("http")) {
      const uriParts = profilePic.split(".");
      const fileType = uriParts[uriParts.length - 1].toLowerCase();
      let mimeType = "image/jpeg";

      if (fileType === "png") mimeType = "image/png";
      else if (fileType === "jpg" || fileType === "jpeg")
        mimeType = "image/jpeg";

      formData.append("profilePic", {
        uri: profilePic,
        name: `profile.${fileType}`,
        type: mimeType,
      } as any);
    }

    const response = await fetch(`${URL}/api/users/update-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Något gick fel");
    }

    return data.user;
  } catch (err) {
    console.error("Fel i updateProfile:", err);
    return null;
  }
};
