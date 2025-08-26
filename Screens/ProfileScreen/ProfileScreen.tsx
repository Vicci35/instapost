import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { handleLogout } from "@/controllers/logoutController";
import styles from "../../styles/ProfileScreenStyles";
import { UserContext } from "@/contexts/userContext";

type Post = {
  id: string;
  image: string;
};

type User = {
  name: string;
  profilePic: string;
  followers: number;
  following: number;
  posts: Post[];
};

const ProfileScreen: React.FC = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  const userData: User = {
    name: user?.name || "None",
    profilePic: "https://i.pravatar.cc/150?img=12",
    followers: 120,
    following: 80,
    posts: [
      { id: "1", image: "https://picsum.photos/200/200?random=1" },
      { id: "2", image: "https://picsum.photos/200/200?random=2" },
      { id: "3", image: "https://picsum.photos/200/200?random=3" },
      { id: "4", image: "https://picsum.photos/200/200?random=4" },
      { id: "5", image: "https://picsum.photos/200/200?random=5" },
    ],
  };

  const renderPost: ListRenderItem<Post> = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.postImage} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userData.profilePic }}
          style={styles.profilePic}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{userData.posts.length}</Text>
              <Text style={styles.statLabel}>Inlägg</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Följare</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{userData.following}</Text>
              <Text style={styles.statLabel}>Följer</Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("..")}
            >
              <Text style={styles.editButtonText}>Redigera profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Följ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={userData.posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderPost}
        style={styles.postsContainer}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogout(router, Platform.OS, logout)}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
