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
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

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
  name: string;
  profileImageUrl?: string;
}

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const searchInputRef = useRef(null);
  const { user, token } = useContext(UserContext);

  const BACKEND_URL =
    Platform.OS === "web"
      ? "http://localhost:3000"
      : "http://192.168.68.104:3000";

  const currentUserId = user?._id;

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      fetchLikedPosts();
    }, [])
  );

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

  const handleComment = async (postID: string, comment: string) => {
    if (!user || !user.name || !user._id) {
      console.error("Användardata är inte tillgänglig. Kan inte kommentera.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/posts/${postID}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          userId: user._id,
          username: user.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte skicka kommentar");
      }

      const data = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postID) {
            return {
              ...post,
              comments: data.comments,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Kunde inte skicka kommentar:", error);
    }
  };

  //Hämtar gillade inlägg
  const fetchLikedPosts = async () => {
    if (!currentUserId || !token) {
      return;
    }
    try {
      const response = await fetch(
        `${BACKEND_URL}/posts/likes/${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Kunde inte hämta gillade inlägg");
      }
      const data = await response.json();
      setLikedPosts(data);
    } catch (error) {
      console.error("Fel vid hämtning av gillade inlägg:", error);
    }
  };

  useEffect(() => {
    if (token) {
      // Vänta tills vi har token
      fetchPosts();
      fetchUsers();
      fetchLikedPosts();
    }
  }, [token, user]);

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

  const handleLike = async (postID: string) => {
    if (!currentUserId || !token) {
      console.error("Användaren eller token saknas.");
      return;
    }

    try {
      const isCurrentlyLiked = likedPosts.includes(postID);
      const endpoint = "toggle-like";

      const response = await fetch(
        `${BACKEND_URL}/posts/${postID}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userID: currentUserId }),
        }
      );

      if (!response.ok) {
        throw new Error("Kunde inte ändra gilla-status");
      }

      const data = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postID ? { ...post, likes: data.likes } : post
        )
      );

      setLikedPosts((prevLikedPosts) => {
        if (isCurrentlyLiked) {
          return prevLikedPosts.filter((id) => id !== postID);
        } else {
          return [...prevLikedPosts, postID];
        }
      });
    } catch (error) {
      console.error("Fel vid gilla-markering:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    fetchLikedPosts();
  };

  // Funktion för att navigera till användarprofil
  const navigateToUserProfile = (userId: string) => {
    router.push(`/(protected)/(profile)/${userId}`);
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
      <View style={{ padding: 12 }}>
        <TextInput
          ref={searchInputRef}
          placeholder="Sök användare..."
          placeholderTextColor="#555"
          value={searchText}
          onChangeText={setSearchText}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
      </View>

      {searchText.length > 0 && (
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
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
              Sökresultat ({searchResults.length}):
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ width: "100%", marginBottom: 12 }}>
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
              userID={currentUserId}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </SafeAreaView>
  );
}
