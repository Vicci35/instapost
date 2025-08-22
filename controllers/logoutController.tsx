import { useRouter } from "expo-router";

export const handleLogout = async (
  router: ReturnType<typeof useRouter>,
  platform: string
) => {
  // !!! ÄNDRA TILL ERAN IP ADRESS + :3000
  const URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.1.223:3000";

  try {
    const response = await fetch(URL + "/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      console.log("Logged out successfully");
      router.replace("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (err) {
    console.error("Error logging out:", err);
  }
};
