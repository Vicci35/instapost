import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, ActivityIndicator, RefreshControl, TextInput, View, Text, Platform } from "react-native";
import { styles } from "@/styles/protectedStyles";
import PostCard from "@/app/components/PostCard";

interface Comment {
  text: string;
  username: string; 
}

interface Post {
  id: string;
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

  const [following, setFollowing] = useState<string[]>(["varsa", "larsa"]);
  const [searchText, setSearchText] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const BACKEND_URL =
    Platform.OS === "web"
      ? "http://localhost:3000"
      : "http://192.168.1.140:3000";

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users`);
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
      setPosts(data);
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
        body: JSON.stringify({ comment, userId: "ditt_användar_ID_här", username: "ditt_användarnamn_här" }),
      });
      fetchPosts();
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
      const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  }, [searchText, allUsers]);

  const handleLike = async (postId: string) => {
    try {
      await fetch(`${BACKEND_URL}/posts/${postId}/like`, {
        method: "POST",
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Kunde inte gilla inlägg:", error);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const filteredPosts = posts.filter((post) => following.includes(post.username));

  return (
    <SafeAreaView style={styles.container}>

      <TextInput
        placeholder="Sök användare eller caption..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          margin: 12,
          borderRadius: 8
        }}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <>

          {searchText.length > 0 ? (
            <FlatList
              data={searchResults}
              
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                  <Text>{following.includes(item.username) ? 'Du följer denna användare' : 'Följ'}</Text>
                </View>
              )}
              contentContainerStyle={{ padding: 12 }}
            />
          ) : (
            <FlatList
              data={filteredPosts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PostCard

                  id={item.id}
                  username={item.username}
                  profileImageUrl={item.profileImageUrl}
                  imageUrl={item.imageUrl}
                  caption={item.caption}
                  likes={item.likes}
                  comments={item.comments || []}
                  onLike={() => handleLike(item.id)}
                  onComment={(comment) => handleComment(item.id, comment)}
                />
              )}
              contentContainerStyle={{ padding: 12 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
