import { Platform } from "react-native";

const getApiUrl = () => {
  if (Platform.OS === "web") {
    return "http://localhost:3000";
  } else {
    return "http://192.168.1.140:3000"; //Din egna IP adress
  }
};

export const API_BASE_URL = getApiUrl();
