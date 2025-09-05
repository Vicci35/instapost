import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter, useFocusEffect } from "expo-router";
import { getProfile } from "@/controllers/profileController";
import { handleLogout } from "@/controllers/logoutController";
import { UserContext } from "@/contexts/userContext";
import styles from "../../styles/ProfileScreenStyles";

type Post = {
  _id: string;
  imageUrl: string;
  caption?: string;
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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const platform = Platform.OS;
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;
  const postMargin = 2;
  const postSize = screenWidth / 3 - postMargin * 2;
  const BACKEND_URL =
    platform === "web" ? "http://localhost:3000" : "http://192.168.68.104:3000";

  // Hämta användarprofil
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        if (!token) return;
        setLoading(true);
        try {
          const freshUser = await getProfile(token);
          if (freshUser) {
            setUserData(freshUser);
            setUser(freshUser);
            if (platform === "web") {
              localStorage.setItem("id", freshUser._id);
            } else {
              await SecureStore.setItemAsync("id", freshUser._id);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }, [token])
  );

  // Refresh user
  useEffect(() => {
    const refreshUser = async () => {
      if (!user && token) {
        try {
          const data = await getProfile(token);
          if (data) {
            setUserData(data);
            setUser(data);
            setLoading(false);
          }
        } catch (err) {
          console.error("Refresh failed:", err);
        }
      }
    };
    refreshUser();
  }, [user, token]);

  const handlePress = (item: Post) => {
    setSelectedPost(item);
  };

  const renderPost = ({ item }: { item: Post }) => {
    const imageUri = item.imageUrl.startsWith("http")
      ? item.imageUrl
      : `${BACKEND_URL}/${item.imageUrl}`;

    return (
      <TouchableOpacity
        style={{ width: postSize, height: postSize, margin: 1 }}
        onPress={() => handlePress(item)}
      >
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };

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
        <Text>Ingen användardata hittades</Text>
      </View>
    );
  }

  const profileImageUri = userData.profileImage
    ? userData.profileImage.startsWith("http")
      ? userData.profileImage
      : `${BACKEND_URL}/${userData.profileImage}`
    : undefined;

  return (
    <View style={styles.container}>
      {/* Header med profilbild och info */}
      <View style={styles.header}>
        <Image
          source={
            profileImageUri
              ? { uri: profileImageUri }
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
          </View>

          {userData.bio && <Text style={styles.bio}>{userData.bio}</Text>}
        </View>
      </View>

      {/* Inlägg */}
      <FlatList
        data={userData.posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={renderPost}
        style={styles.postsContainer}
      />

      {/* Logga ut */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogout(router, platform, logout)}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>

      {/* Modal för att visa ett inlägg */}
      {selectedPost && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setSelectedPost(null)}
          />
          <View style={styles.modalContent}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {userData.name}
            </Text>
            <Image
              source={{
                uri: selectedPost.imageUrl.startsWith("http")
                  ? selectedPost.imageUrl
                  : `${BACKEND_URL}/${selectedPost.imageUrl}`,
              }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            {selectedPost.caption && (
              <Text style={styles.modalCaption}>{selectedPost.caption}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
