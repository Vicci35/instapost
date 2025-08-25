import { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, RefreshControl, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/protectedStyles";
import PostCard from "../components/PostCard";


interface Post {
  id: string;
  username: string;
  profileImageUrl?: string;
  imageUrl: string;
  caption: string;
  likes: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [following, setFollowing] = useState<string[]>(["varsa", "larsa"]);

   const BACKEND_URL =
    Platform.OS === "web"
      ? "http://localhost:3000"          
      : "http://192.168.1.140:3000";     // byt till din IP

  
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

  
  useEffect(() => {
    fetchPosts();
  }, []);

  
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
  };

  
  const handleComment = (postId: string) => {
    console.log("Kommenterat på inlägget:", postId);
    
  };

  
  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const filteredPosts = posts.filter((post) => following.includes(post.username));

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              username={item.username}
              profileImageUrl={item.profileImageUrl}
              imageUrl={item.imageUrl}
              caption={item.caption}
              likes={item.likes}
              onLike={() => handleLike(item.id)}
              onComment={() => handleComment(item.id)}
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
