import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const postMargin = 2;
export const postSize = screenWidth / 3 - postMargin * 2;

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
    marginHorizontal: 16,
  },
  postsContainer: {
    flex: 1,
  },
  postWrapper: {
    width: postSize,
    height: postSize,
    margin: postMargin,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 300,
    marginVertical: 12,
  },
  modalCaption: {
    fontSize: 16,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 8,
    width: "100%",
  },
  iconButton: {
    marginRight: 16,
  },
});
