import { Router } from "expo-router";

export const handleNewPost = async (
  caption: string,
  name: string,
  id: string,
  uri: string | null,
  platform: string,
  profileImageUrl?: string
) => {
  let imageBase64: string | null = null;

  if (uri && platform === "web") {
    const response = await fetch(uri);
    const blob = await response.blob();

    const reader = new FileReader();
    imageBase64 = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Gör om till base64 direkt
    });
  }

  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.198:3000";

  const response = await fetch(URL + "/posts/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      caption,
      username: name,
      userId: id,
      imageBase64,
      profileImageUrl,
    }),
  });

  const data = await response.json();
  console.log("Server response:", data);
  return data;
};
