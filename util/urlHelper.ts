import { Platform } from 'react-native';

const LOCAL_IP = "http://192.168.1.140:3000"; // ✅ Uppdatera med din egen IP-adress
const LOCALHOST_URL = "http://localhost:3000";

export const getImageUrl = (url?: string | null): string | undefined => {
  if (!url) {
    return undefined; // Returnera undefined om URL:en är tom
  }
  
  if (Platform.OS !== 'web' && url.includes(LOCALHOST_URL)) {
    // Om vi inte är på webben, ersätt localhost med den lokala IP-adressen
    return url.replace(LOCALHOST_URL, LOCAL_IP);
  }
  
  // Annars, returnera den ursprungliga URL:en
  return url;
};