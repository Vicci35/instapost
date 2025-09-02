import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { getProfile } from "@/controllers/profileController";
import styles from "../../styles/ProfileScreenStyles";
import { handleLogout } from "@/controllers/logoutController";
import { UserContext } from "@/contexts/userContext";

type Post = {
  _id: string;
  imageUrl: string;
  caption?: string;
  createdAt?: string;
};
type User = {
  name: string;
  profileImage?: string;
  bio?: string;
  followers: string[];
  following: string[];
  posts: Post[];
};

const ProfileScreen: React.FC = () => {
  const { user, token, setUser, logout } = useContext(UserContext);
  const [userData, setUserData] = useState<User | null>(user || null);
  const [loading, setLoading] = useState(!user);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        if (!token) return;
        try {
          setLoading(true);
          const freshUser = await getProfile(token);
          if (freshUser) {
            setUserData(freshUser);
            setUser(freshUser);
          }
        } catch (err) {
          console.error("Fel vid hämtning av användardata:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }, [token])
  );

  const renderPost: ListRenderItem<Post> = ({ item }) => (
    <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
  );

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );

  if (!userData)
    return (
      <View style={styles.container}>
        <Text>Ingen användardata hittades</Text>
      </View>
    );

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
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("/(protected)/(profile)/settings")}
            >
              <Text style={styles.editButtonText}>Redigera profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Följ</Text>
            </TouchableOpacity>
          </View>
          {userData.bio && <Text style={styles.bio}>{userData.bio}</Text>}
        </View>
      </View>

      <FlatList
        data={userData.posts}
        keyExtractor={(item) => item._id}
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
