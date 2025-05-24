import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import tw from "twrnc";
import check from "../../assets/images/check.png";

export default function StudentScreen() {
  const [search, setSearch] = useState("");
  return (
    <View style={tw`pt-12 max-w-[320px] mx-auto`}>
      <Text
        style={[tw`text-white text-[17px] leading-[25px] !font-manrope pt-8 mb-3`]}>
        Профіль активовано — тепер тебе можуть знайти учні!
      </Text>
      <View style={tw`flex-row items-start mb-4 w-full relative`}>
        <Image
          source={check}
          style={tw`w-5 h-[18px] mt-[2px] absolute`}
          resizeMode="contain"
        />
        <Text
          style={tw`text-white text-[16px] leading-[20px] font-manrope text-center tracking-[-0.32px] mb-8 `}>
          Увімкни доступність, налаштуй графікі вже сьогодні зможеш
          отриматиперший запит від учня.
        </Text>
      </View>
      <View>
        <Text style={tw`text-white !font-manrope text-[18px]`}>Що далі</Text>
      </View>
    </View>
  );
}
