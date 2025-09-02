import { useRouter } from "expo-router";

export const ImageController = (uri: string | null) => {
  const router = useRouter();

  if (uri !== null) {
    // Encode URI för säker navigering
    const encodedUri = encodeURIComponent(uri);
    router.push(`/EditPost?uri=${encodedUri}`);
  }
};
