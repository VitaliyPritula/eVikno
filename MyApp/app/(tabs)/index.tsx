import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Main: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-black max-w-[350px] mx-auto`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={tw`text-white text-center text-[17px] leading-[25px] font-bold  !font-ptsansnarrow`}>
          Платформа, що з`єднує інструктора і учня просто перед практичним
          іспитом в СЦ
        </Text>
      </View>

      <View style={tw`px-4 gap-3`}>
        <TouchableOpacity
          onPress={() => router.push("/student/onboarding")}
          style={tw`bg-[#44E9E8] hover:bg-[#A3FF44] py-3 rounded-[23px]`}>
          <Text style={tw`text-btn text-center !font-ptsansnarrow font-bold`}>
            Я учень
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
                  onPress={() => router.push("/instructor/onboarding")}
          style={tw`bg-[#8BD73D] py-3 rounded-[23px]`}>
          <Text style={tw`text-btn text-center !font-ptsansnarrow font-bold`}>
            Я інструктор
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={tw`text-center text-[#C7C7C7] !font-marcellus font-bold pt-[32px] mb-[15px]`}>
        Маршрут замість очікування
      </Text>
    </SafeAreaView>
  );
};

export default Main;
