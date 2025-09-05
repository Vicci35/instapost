import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type BioTextProps = {
  bio: string;
};

const BioText: React.FC<BioTextProps> = ({ bio }) => {
  const router = useRouter();

  const renderPart = (part: string, index: number) => {
    if (part.startsWith("@")) {
      const name = part.substring(1);
      return (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(`/(protected)/(userProfile)/${name}`)}
        >
          <Text style={{ color: "#3498db", fontWeight: "600" }}>{part}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <Text key={index} style={{ color: "#000" }}>
        {part}{" "}
      </Text>
    );
  };
  return (
    <Text style={{ flexWrap: "wrap" }}>
      {bio.split(" ").map((part, i) => renderPart(part, i))}
    </Text>
  );
};
export default BioText;
