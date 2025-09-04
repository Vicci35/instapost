import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "@/contexts/userContext";
import { FlatList, SafeAreaView, ActivityIndicator, RefreshControl, TextInput, View, Text, Platform, TouchableOpacity } from "react-native";
import { styles } from "@/styles/protectedStyles";
import PostCard from "@/app/components/PostCard";


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
  profileImageUrl?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]); 
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const searchInputRef = useRef(null);
  const { user } = useContext(UserContext);

  const BACKEND_URL =
    Platform.OS === "web"
      ? "http://localhost:3000"

      : "http://192.168.1.140:3000";

   
 const currentUserId = user?._id;
 const currentUsername = user?.username;

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users`); 
      if (!response.ok) throw new Error("Kunde inte hämta användare");
      const data = await response.json();
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
    try {
      await fetch(`${BACKEND_URL}/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, userId: currentUserId, username: currentUsername }),
      });
      

    } catch (error) {
      console.error("Kunde inte skicka kommentar:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const filteredUsers = allUsers.filter((user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [searchText, allUsers]);

const handleLike = async (postId: string) => {
    if (!currentUserId) {
        console.error("Användaren är inte inloggad.");
        return;
    }
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
              likes: isCurrentlyLiked ? post.likes - 1 : post.likes + 1,
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

  const filteredPosts = posts;

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
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.username}</Text>
              <Text>Följ</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 12 }}
          ListHeaderComponent={
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Sökresultat:</Text>
          }
        />
      </View>
    )}

    {loading ? (
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
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
            isLiked= {likedPosts.includes(item._id)}
          />
        )}
        contentContainerStyle={{ padding: 12 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    )}
  </SafeAreaView>
  )}
