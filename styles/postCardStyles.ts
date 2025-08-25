import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  caption: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likes: {
    marginLeft: 8,
    fontWeight: "600",
  },
});