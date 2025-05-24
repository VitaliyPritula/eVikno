import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";

const Main: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-black max-w-[350px] mx-auto`}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={[
            tw`text-white text-center text-[17px] leading-[32px] font-bold`,
            { fontFamily: "ptsansnaBold" }, // або інша назва, яку ти підключив у useFonts
          ]}>
          Платформа, що з&apos;єднує інструктора і учня просто перед практичним
          іспитом в СЦ
        </Text>
      </View>

      <View style={tw`px-4 gap-3`}>
        <TouchableOpacity
          onPress={() => router.push("/student/onboarding")}
          style={tw`bg-[#44E9E8] hover:bg-[#A3FF44] py-3 rounded-[23px]`}>
          <Text style={[tw`text-btn text-center text-lg font-bold`, { fontFamily: "ptsansnaBold" },]}>
            Я учень
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/instructor/onboarding")}
          style={tw`bg-[#8BD73D] py-3 rounded-[23px]`}>
          <Text style={[tw`text-btn text-lg text-center font-bold`, { fontFamily: "ptsansnaBold" },]}>
            Я інструктор
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[tw`text-center text-[#C7C7C7] text-[16px] font-bold pt-[32px] mb-[15px]`, {fontFamily:"marcellus"},]}>
        Маршрут замість очікування
      </Text>
    </SafeAreaView>
  );
};

export default Main;
