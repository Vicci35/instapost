import { StyleSheet } from "react-native";

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    width: 300,
    height: 400,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 34,
  },
  button: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonIcon: {
    justifyContent: "flex-end",
    // alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  photoButtonContainer: {
    color: "white",
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 12,
    width: 250,
    textAlign: "center",
    margin: 5,
  },
  photoButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
