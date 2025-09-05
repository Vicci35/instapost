import { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/postCardStyles";
import { getImageUrl } from "@/util/urlHelper";

interface Comment {
  text: string;
  username: string;
}

interface PostCardProps {
  id: string;
  username: string;
  userID: string;
  profileImageUrl?: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[]
  onLike: (id: string, userID: string) => void;
  onComment: (comment: string) => void;
  isLiked: boolean; 
}

export default function PostCard({
  id,
  username,
  profileImageUrl,
  imageUrl,
  caption,
  likes,
  comments,
  userID, 
  onLike,
  onComment,
  isLiked, 
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.length > 0) {
      onComment(commentText);
      setCommentText("");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {profileImageUrl ? (
          <Image source={{ uri: getImageUrl(profileImageUrl )}} style={styles.profileImage} />
        ) : (
           <Image
           source={require("../../assets/images/defaultBildProfil.jpg")}
           style={styles.profileImage}
           />
        )}
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image source={{ uri: getImageUrl( imageUrl )}} style={styles.postImage} />
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onLike(id, userID)} style={styles.iconButton}>
          {isLiked ? (
            <Ionicons name= "heart" size={24} color="red"/>
          ) : ( 
          <Ionicons name="heart-outline" size={24} color="#000" />
          )}
         </TouchableOpacity>
         {/* ✅ Använd onPress för att växla tillståndet */}
        <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.iconButton}>
         <Ionicons name="chatbubble-outline" size={24} color="#000" />
          {/* ✅ Visa antalet kommentarer bredvid bubblan */}
          {comments.length > 0 && (
            <View style={styles.commentCountBadge}>
             <Text style={styles.commentCountText}>{comments.length}</Text>
            </View>
          )}
        </TouchableOpacity>
       </View>

      <View style={styles.info}>
        <Text style={styles.likes}>{likes} gilla-markeringar</Text>
        <Text>
          <Text style={styles.username}>{username}</Text> {caption}
        </Text>
      </View>

      {/* Villkorlig rendering: visa kommentarer endast om showComments är true */}
      {showComments && comments.length > 0 && (
        <View style={styles.commentSection}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Text>
                <Text style={styles.username}>{comment.username}</Text> {comment.text}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.commentSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Lägg till en kommentar..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button title="Skicka" onPress={handleCommentSubmit} />
      </View>
    </View>
  );
}
