import { StyleSheet, Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
const isWeb = Platform.OS === "web";

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
    flexWrap: "wrap", // så infoContainer bryts på små skärmar
  },
  profilePic: {
    width: Math.min(90, screenWidth / 4),
    height: Math.min(90, screenWidth / 4),
    borderRadius: Math.min(90, screenWidth / 4) / 2,
    resizeMode: "cover",
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    minWidth: 0, // gör att text bryts korrekt på små skärmar
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
    flexWrap: "wrap", // knappar bryts på små skärmar
  },
  editButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
    flex: isWeb ? undefined : 1, // på mobil tar den upp hela raden
    marginRight: 8,
    marginBottom: 8,
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
    flex: isWeb ? undefined : 1,
    marginRight: 8,
    marginBottom: 8,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "blue",
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 8,
    borderRadius: 12,
    width: isWeb ? 250 : "80%",
    alignSelf: "center",
    marginVertical: 16,
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
    flexWrap: "wrap",
  },
  postsContainer: {
    flex: 1,
  },
  postWrapper: {
    margin: 2,
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
    marginTop: 8,
  },
  actions: {
    flexDirection: "row",
    padding: 10,
  },
  iconButton: {
    marginRight: 10,
  },
});
