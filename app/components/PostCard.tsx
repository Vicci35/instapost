import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "@/styles/postCardStyles";

type PostCardProps = {
  username: string;
  imageUrl: string;
  caption: string;
  likes: number;
  onLike: () => void;
  onComment: () => void;
};

export default function PostCard({
  username,
  imageUrl,
  caption,
  likes,
  onLike,
  onComment,
}: PostCardProps) {
  return (
    <View style={styles.card}>
      {/* Användarnamn */}
      <Text style={styles.username}>{username}</Text>

      {/* Bild */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Bildtext */}
      <Text style={styles.caption}>{caption}</Text>

      {/* Gilla & kommentera */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLike}>
          <FontAwesome name="heart-o" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.likes}>{likes} likes</Text>

        <TouchableOpacity onPress={onComment}>
          <FontAwesome name="comment-o" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}