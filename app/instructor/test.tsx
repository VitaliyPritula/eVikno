import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useInstructorsStore } from "@/store/freeInstructorsStore";

const Test = () => {
  // зараз в базі є інструктори з 8041 та 4641
  const selectedCenterId = "8041"; // Example selected center 8041 4641
  const { instructors, fetchFreeInstructors, clearSubscription } =
    useInstructorsStore();
  //console.log("err in Test", error);
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
        {/* {error && (
          <Text className="text-red-500 text-center mt-4">
            Помилка з’єднання. Перевірте інтернет.
          </Text>
        )} */}
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
// не забути обробити оффлайн
// npx expo install @react-native-community/netinfo
// import NetInfo from "@react-native-community/netinfo";
// import { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// const Test = () => {
//   const [isConnected, setIsConnected] = useState<boolean | null>(null);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       setIsConnected(state.isConnected);
//     });

//     // Проверка при первом рендере
//     NetInfo.fetch().then((state) => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <View style={{ padding: 20 }}>
//       {isConnected === false && (
//         <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
//           🚫 Ви офлайн. Дані можуть бути неактуальними.
//         </Text>
//       )}

//       {/* остальная логика: instructors, FlatList и т.д. */}
//     </View>
//   );
// };

// in state
// fetchFreeInstructors: async (serviceCenterId: string) => {
//   const netState = await NetInfo.fetch();
//   if (!netState.isConnected) {
//     set({
//       error: "Ви офлайн. Перевірте інтернет-з'єднання.",
//       instructors: [],
//     });
//     return;
//   }
