import { useRouter } from "expo-router";

export const handleLogout = (router: ReturnType<typeof useRouter>) => {
  // Reset token and state
  router.replace("/login");
  // router.back();
};
