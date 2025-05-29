import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import { style } from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";

const Main: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView className=" container flex-1 bg-black  mx-auto">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-center text-[17px] leading-[32px] font-bold text-ptsansnaBold">
          Платформа, що з&apos;єднує інструктора і учня просто перед практичним
          іспитом в СЦ
        </Text>
      </View>

      <View className="px-4 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/student/onboarding")}
          className="bg-[#44E9E8] hover:bg-[#A3FF44] py-3 rounded-[23px]"
        >
          <Text className=" text-center text-lg font-bold  text-ptsansnaBold">
            Я учень
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/instructor/onboarding")}
          className="bg-green py-3 rounded-[23px]"
        >
          <Text className="text-lg text-center font-bold text-ptsansnaBold">
            Я інструктор
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-[#C7C7C7]  font-marcellus text-center  text-[16px] font-bold pt-[32px] mb-[15px]">
        Маршрут замість очікування
      </Text>
    </SafeAreaView>
  );
};

export default Main;
