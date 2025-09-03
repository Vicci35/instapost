import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "../../styles/ProfileScreenStyles";
import { getUserProfile } from "@/controllers/profileController";

type Post = {
  _id: string;
  imageUrl: string;
};

type User = {
  _id: string;
  name: string;
  profileImage?: string;
  bio?: string;
  followers: string[];
  following: string[];
  posts: Post[];
};

const UserProfileScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [userData, setUserData] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(id);
        setUserData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Kunde inte hitta användare</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            userData.profileImage
              ? { uri: userData.profileImage }
              : require("../../assets/images/defaultBildProfil.jpg")
          }
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
              <Text style={styles.statNumber}>{userData.followers.length}</Text>
              <Text style={styles.statLabel}>Följare</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{userData.following.length}</Text>
              <Text style={styles.statLabel}>Följer</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Följ</Text>
          </TouchableOpacity>
          {userData.bio && <Text style={styles.bio}>{userData.bio}</Text>}
        </View>
      </View>

      <FlatList
        data={userData.posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        )}
        style={styles.postsContainer}
      />
    </View>
  );
};

export default UserProfileScreen;
