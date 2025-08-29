import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "flex-start",
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  followButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 6,
    alignItems: "center",
  },

  followButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "blue",
  },
  postsContainer: {
    flex: 1,
  },
  postImage: {
    width: "33%",
    height: 120,
  },
  button: {
    color: "white",
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 12,
    width: 250,
    textAlign: "center",
    margin: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  bio: {
    fontSize: 14,
    color: "black",
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
});
