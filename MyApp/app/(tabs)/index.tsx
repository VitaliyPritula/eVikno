import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";

const MyComponent: React.FC = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-black max-w-[350px] mx-auto`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text
          style={tw`text-white text-center text-[16px] font-bold !font-ptsansnarrow`}>
          Платформа, що з`єднує інструктора і учня просто перед практичним іспитом в СЦ
        </Text>
      </View>

      <View style={tw`px-4 gap-3`}>
        <TouchableOpacity style={tw`bg-[#44E9E8] hover:bg-[#A3FF44] py-3 rounded-[23px]`}>
          <Text style={tw`text-btn text-center !font-ptsansnarrow font-bold`}>Я студент</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-[#8BD73D] py-3 rounded-[23px]`}>
          <Text style={tw`text-btn text-center !font-ptsansnarrow font-bold`}>Я інструктор</Text>
        </TouchableOpacity>
      </View>
       <Text style={tw`text-center text-white !font-ptsansnarrow font-bold pt-[32px] mb-[15px]`}>Маршрут  замість очікування</Text>
      
    </SafeAreaView>
  );
};

export default MyComponent;
