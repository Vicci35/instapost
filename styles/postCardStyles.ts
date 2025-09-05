import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  profileImagePlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  actions: {
    flexDirection: "row",
    padding: 10,
  },
  iconButton: {
    marginRight: 10,
  },
  info: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  likes: {
    fontWeight: "bold",
  },
  commentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
 
  commentSection: {
        marginTop: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
   commentCountBadge: {
     position: "absolute",
     top: -5,
     right: -5,
     backgroundColor: "red",
     borderRadius: 10,
     paddingHorizontal: 6,
     paddingVertical: 2,
     justifyContent: "center",
     alignItems: "center",
   },
   commentCountText: {
     color: "white",
     fontSize: 10,
     fontWeight: "bold",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
