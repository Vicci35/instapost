import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
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
  followButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
    width: 120,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "blue",
  },
  bio: {
    fontSize: 14,
    color: "black",
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  postsContainer: {
    flex: 1,
  },
  postWrapper: {
    flex: 1 / 3, // tre kolumner
    aspectRatio: 1,
    margin: 1,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
});
