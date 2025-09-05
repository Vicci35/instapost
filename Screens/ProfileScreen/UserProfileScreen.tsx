import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/UserProfileScreenStyles"; // egen stylingfil
import {
  getUserProfile,
  getUserProfileByName,
} from "@/controllers/profileController";
import { UserContext } from "@/contexts/userContext";
import BioText from "@/app/components/BioText";

type Post = {
  _id: string;
  imageUrl: string;
};

type Follower = {
  _id: string;
};

type User = {
  _id: string;
  name: string;
  profileImage?: string;
  bio?: string;
  followers: Follower[];
  following: Follower[];
  posts: Post[];
};

type UserProfileScreenProps = {
  userId?: string;
  name?: string;
};

const BACKEND_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : "http://192.168.68.105:3000";

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  userId,
  name,
}) => {
  const { token, user } = useContext(UserContext);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        let data: User | null = null;

        if (userId) {
          data = await getUserProfile(userId, token);
        } else if (name) {
          data = await getUserProfileByName(name, token);
        }

        if (data) {
          setUserData(data);
          if (user && data.followers.some((f) => f._id === user._id)) {
            setIsFollowing(true);
          }
        }
      } catch (err) {
        console.error("Fel vid hämtning av användarprofil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, name, token]);

  // Följ / Avfölj
  const toggleFollow = async () => {
    if (!token || !userData) return;

    const url = `${BACKEND_URL}/api/users/follow/${userData._id}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Något gick fel vid följning");

      setIsFollowing(!isFollowing);
      setUserData((prev) =>
        prev
          ? {
              ...prev,
              followers: isFollowing
                ? prev.followers.filter((f) => f._id !== user?._id)
                : [...prev.followers, { _id: user?._id }],
            }
          : prev
      );
    } catch (err) {
      console.error("Fel vid följa/avfölja:", err);
    }
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
        <Text>Kunde inte hitta användare</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
          <TouchableOpacity style={styles.followButton} onPress={toggleFollow}>
            <Text style={styles.followButtonText}>
              {isFollowing ? "Avfölj" : "Följ"}
            </Text>
          </TouchableOpacity>
          {userData.bio && <BioText bio={userData.bio} />}
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
    </SafeAreaView>
  );
};

export default UserProfileScreen;
