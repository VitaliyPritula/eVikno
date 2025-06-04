import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useInstructorsStore } from "@/store/freeInstructorsStore";

const Test = () => {
  const selectedCenterId = "8041"; // Example selected center 8041 4641
  const { instructors, fetchFreeInstructors, clearSubscription } =
    useInstructorsStore();

  useEffect(() => {
    if (selectedCenterId) {
      fetchFreeInstructors(selectedCenterId);
    }

    return () => {
      clearSubscription();
    };
  }, [selectedCenterId, fetchFreeInstructors, clearSubscription]);
  console.log("instructors", instructors);
  return (
    <SafeAreaView className="flex-1  container">
      <View className="py-8 ">
        <Text className="text-white text-lg font-bold">
          Список Вільних Інструкторів
        </Text>
        {instructors.length > 0 ? (
          <FlatList
            data={instructors}
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-200">
                <Text className="text-lg text-white font-bold">
                  {item.name}
                </Text>
                <Text className="text-sm text-white">{item.phone}</Text>
              </View>
            )}
            keyExtractor={(item) => item.uidInstructor}
          />
        ) : (
          <Text className="text-sm text-white">
            Нажаль зараз немає вільних інструкторів
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Test;
