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
  // postsContainer: {
  //   flex: 1,
  // },
  // postImage: {
  //   width: "33%",
  //   height: 120,
  // },
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
  postsContainer: {
    flex: 1,
  },
  postWrapper: {
    flex: 1 / 3, // Delar upp raden i tre kolumner
    aspectRatio: 1, // Gör rutan kvadratisk
    margin: 1, // Lite mellanrum mellan bilderna
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
    zIndex: 10,
  },

  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },

  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },

  modalCaption: {
    fontSize: 16,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    padding: 10,
  },
  iconButton: {
    marginRight: 10,
  },
});
