import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const handleLogout = async (
  router: ReturnType<typeof useRouter>,
  platform: string,
  logout: () => void
) => {
  // !!! ÄNDRA TILL ERAN IP ADRESS + :3000
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.140:3000";

  try {
    const response = await fetch(URL + "/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      if (Platform.OS !== "web") {
        SecureStore.deleteItemAsync("userToken");
      }
      logout();
      console.log("Logged out successfully");
      router.replace("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (err) {
    console.error("Error logging out:", err);
  }
};
