// components/rating/StarRating.tsx
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  rating: number;        // 4.3
  count?: number;        // 12
  size?: number;         // 16
};

export default function StarRating({
  rating,
  count,
  size = 16,
}: Props) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <View className="flex-row items-center gap-x-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Ionicons key={i} name="star" size={size} color="#FFD700" />
          );
        }

        if (i === fullStars && hasHalf) {
          return (
            <Ionicons
              key={i}
              name="star-half"
              size={size}
              color="#FFD700"
            />
          );
        }

        return (
          <Ionicons
            key={i}
            name="star-outline"
            size={size}
            color="#FFD700"
          />
        );
      })}

      <Text className="text-white ml-2 text-sm">
        {rating.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </Text>
    </View>
  );
}
