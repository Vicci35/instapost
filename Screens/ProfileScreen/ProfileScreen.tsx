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
import { refreshUserData } from "@/controllers/refreshController";
import { Ionicons } from "@expo/vector-icons";
import BioText from "@/app/components/BioText";

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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const router = useRouter();

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
            localStorage.setItem("id", freshUser._id);
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

  useEffect(() => {
    const refreshUser = async () => {
      const platform = "web"; // vi kör bara web nu
      const userID = localStorage.getItem("id");
      if (!userID) return;

      try {
        const data = await refreshUserData(platform, userID);
        console.log("Refreshed user:", data);
        if (data) {
          setUserData(data);
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Refresh failed:", err);
      }
    };

    if (!user) refreshUser();
  }, [user]);

  // const renderPost: ListRenderItem<Post> = ({ item }) => (
  //   <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
  // );

  const handlePress = (item: Post) => {
    setSelectedPost(item);
  };

  const renderPost: ListRenderItem<Post> = ({ item }) => (
    <TouchableOpacity
      style={styles.postWrapper}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
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
          </View>
          {userData.bio && <BioText bio={userData.bio} />}
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

      {/* Display single post */}
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
              {user.name}
            </Text>
            <Image
              source={{ uri: selectedPost.imageUrl }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="chatbubble-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
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
