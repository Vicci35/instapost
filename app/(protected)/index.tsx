
import { useState, useEffect, useRef, useContext } from "react";

import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { styles } from "@/styles/protectedStyles";
import PostCard from "@/app/components/PostCard";

import { useRouter } from "expo-router";
import { UserContext } from "@/contexts/userContext";


interface Comment {
  text: string;
  username: string;
}

interface Post {
  _id: string;
  username: string;
  profileImageUrl?: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments?: Comment[];
}

interface User {
  _id: string;
  username: string;
  name: string; // Lägg till name eftersom backend skickar detta
  profileImageUrl?: string;
}

export default function Home() {
  const router = useRouter();
  const { user, token } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const searchInputRef = useRef(null);

  const BACKEND_URL =
    Platform.OS === "web"
      ? "http://localhost:3000"
      : "http://192.168.68.105:3000";

  const currentUserId = user?._id;

  const fetchUsers = async () => {
    try {
      // Skicka med Authorization header
      const response = await fetch(`${BACKEND_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Hämtade användare:", data); // Debug log

      setAllUsers(data);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/posts`);
      if (!response.ok) throw new Error("Kunde inte hämta inlägg");
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fel vid hämtning av inlägg:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    if (!currentUserId) return;
    try {
      await fetch(`${BACKEND_URL}/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          userId: currentUserId,

          username: user?.username || "okänd_användare",

        }),
      });
    } catch (error) {
      console.error("Kunde inte skicka kommentar:", error);
    }
  };

  useEffect(() => {
    if (token) {
      // Vänta tills vi har token
      fetchPosts();
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    if (searchText.length > 0) {
      const filteredUsers = allUsers
        .filter((user) => user && (user.username || user.name))
        .filter(
          (user) =>
            user.username?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.name?.toLowerCase().includes(searchText.toLowerCase())
        );
      console.log("Filtrerade användare:", filteredUsers); // Debug log
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [searchText, allUsers]);

  const handleLike = async (postId: string) => {
    try {
      await fetch(`${BACKEND_URL}/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ userId: currentUserId }),
      });

      const isCurrentlyLiked = likedPosts.includes(postId);

      if (isCurrentlyLiked) {
        setLikedPosts(likedPosts.filter((id) => id !== postId));
      } else {
        setLikedPosts([...likedPosts, postId]);
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              likes: likedPosts.includes(postId)
                ? post.likes - 1
                : post.likes + 1,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Kunde inte gilla inlägg:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  // Funktion för att navigera till användarprofil
  const navigateToUserProfile = (userId: string) => {
    // Använd replace istället för push för att undvika ny tab
    router.replace(`/(protected)/userProfile/${userId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        ref={searchInputRef}
        placeholder="Sök användare..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          margin: 12,
          borderRadius: 8,
        }}
      />

      {searchText.length > 0 && (
        <View style={{ marginBottom: 10 }}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (

              <TouchableOpacity
                onPress={() => navigateToUserProfile(item._id)}

                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >

                <Text style={{ fontWeight: "bold" }}>
                  {item.name || item.username}
                </Text>
                <Text>Följ</Text>
              </TouchableOpacity>

            )}
            contentContainerStyle={{ padding: 12 }}
            ListHeaderComponent={
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}
              >

                Sökresultat ({searchResults.length}):

              </Text>
            }
          />
        </View>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              id={item._id}
              username={item.username}
              profileImageUrl={item.profileImageUrl}
              imageUrl={item.imageUrl}
              caption={item.caption}
              likes={item.likes}
              comments={item.comments || []}
              onLike={() => handleLike(item._id)}
              onComment={(comment) => handleComment(item._id, comment)}
              isLiked={likedPosts.includes(item._id)}
            />
          )}
          contentContainerStyle={{ padding: 12 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}
