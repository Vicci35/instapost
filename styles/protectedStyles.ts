import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    paddingTop: 20,
    paddingHorizontal: 12, // lägg till padding för inlägg
    // alignItems: "center" <-- ta bort
    // justifyContent: "center" <-- ta bort
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
});
