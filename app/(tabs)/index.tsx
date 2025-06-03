import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import { style } from "twrnc";
import { Stack, useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { useServiceCentersStore } from "../../store/useServiceCentersStore";

const Main: React.FC = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const fetchCenters = useServiceCentersStore((state) => state.fetchCenters);
  console.log("user in index", user);

  useEffect(() => {
    fetchCenters(); // once all service centers are fetched, they will be available in the store
  }, [fetchCenters]);
  return (
    <View className=" container flex-1 bg-black  mx-auto">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-center text-[17px] leading-[32px] font-bold font-ptsansnaBold">
          Платформа, що з&apos;єднує інструктора і учня просто перед практичним
          іспитом в СЦ
        </Text>
      </View>

      <View className="px-4 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/student/onboarding")}
          className="bg-berus  py-3 rounded-[23px]"
        >
          <Text className=" text-center text-lg font-bold  font-ptsansnaBold">
            Я учень
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/instructor/onboarding")}
          className="bg-green py-3 rounded-[23px]"
        >
          <Text className="text-lg text-center font-bold font-ptsansnaBold">
            Я інструктор
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-textcolor  font-marcellus text-center  text-[16px] font-bold pt-[32px] mb-[15px]">
        Маршрут замість очікування
      </Text>
    </View>
  );
};

export default Main;
