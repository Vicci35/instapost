import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: 250,
  },
  button: {
    color: "white",
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 12,
    width: 250,
    textAlign: "center",
    margin: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  eyeButton: {
    padding: 10,
  },
});
