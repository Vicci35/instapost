// controllers/profileController.ts
import { Platform } from "react-native";

const BACKEND_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "http://192.168.68.105:3000";

export const getProfile = async (token: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/profile`, {
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

export const getUserProfile = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Fel vid hämtning av användarprofil:", error);
    throw error;
  }
};

export const getUserProfileByName = async (name: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/name/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Http error! status: : ${res.status}`);
    }

    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error("Fel vid hämtning av användarprofil (name):", err);
    throw err;
  }
};
