import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const handleLogout = async (
  router: ReturnType<typeof useRouter>,
  platform: string,
  logout: () => void
) => {
  if (platform === "web") {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        console.error("Logout failed", await response.text());
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  } else {
    await SecureStore.deleteItemAsync("userToken");
  }

  logout();
  router.replace("/login");
};
