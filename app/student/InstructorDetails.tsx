// InstructorDetails.tsx
import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "../../types";

type InstructorDetailsRouteProp = RouteProp<
  RootStackParamList,
  "InstructorDetails"
>;

export default function InstructorDetails() {
  const { params } = useRoute<InstructorDetailsRouteProp>();
  const { instructor } = params;

  return (
    <View className="flex-1 justify-center items-center bg-black px-4">
      <Text className="text-white text-xl font-bold mb-4">{instructor.name}</Text>
      <Text className="text-white">Авто: {instructor.car}</Text>
      <Text className="text-white">КП: {instructor.transmission}</Text>
      <Text className="text-white">Місто: {instructor.city}</Text>
    </View>
  );
}
