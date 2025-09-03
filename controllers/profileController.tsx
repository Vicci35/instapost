// controllers/profileController.ts
import { Platform } from "react-native";

export const getProfile = async (token: string) => {
  const URL =
    Platform.OS === "web"
      ? "http://localhost:3000"
      : "http://192.168.68.207:3000";

  try {
    const response = await fetch(`${URL}/api/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Något gick fel");
    }

    return data.user;
  } catch (err) {
    console.error("Fel i getProfile-controller:", err);
    return null;
  }
};

export const getUserProfile = async (userId: string, token?: string) => {
  try {
    const response = await fetch(`${URL}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Något gick fel vid hämtning av användare");
    }
    return data.user;
  } catch (err) {
    console.error("Fel i getUserProfile controller:", err);
    return null;
  }
};
