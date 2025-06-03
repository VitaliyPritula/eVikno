import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { RootStackParamList } from "../../types"; // шляху до types.ts

import users from "../../assets/images/map.png";
import Logo from "../../assets/images/Logo_2.png";

export default function StudentScreen() {
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    setSelected(item);
    setVisible(false);
  };
  const options = ["Сарни", "Рівне", "Київ"];
  const instructors = [
    {
      id: "1",
      name: "Сергій Коваль",
      car: "Skoda Octavia",
      transmission: "Автомат",
      city: "Сарни",
    },
    {
      id: "2",
      name: "Іван Михайлов",
      car: "Skoda Octavia",
      transmission: "Механіка",
      city: "Рівне",
    },
    {
      id: "3",
      name: "Ірина Ткач",
      car: "Hyundai i30",
      transmission: "Механіка",
      city: "Київ",
    },
    {
      id: "4",
      name: "Сергій Коваль",
      car: "Skoda Octavia",
      transmission: "Автомат",
      city: "Сарни",
    },
    {
      id: "5",
      name: "Іван Михайлов",
      car: "Skoda Octavia",
      transmission: "Механіка",
      city: "Рівне",
    },
    {
      id: "6",
      name: "Ірина Ткач",
      car: "Hyundai i30",
      transmission: "Механіка",
      city: "Київ",
    },
  ];

  const filtered = instructors.filter((i) =>
    selected ? i.city === selected : true
  );
  
  const router = useRouter();

  return (
    <View className="flex-1 bg-black px-4 pt-4">
      <View className="w-full h-14 bg-black justify-center items-center"></View>

      <ScrollView
        className="pb-20 px-[15px]"
        showsVerticalScrollIndicator={false}>
        <View className="max-w-[320px] mx-auto">
          <View className="items-center mb-2">
            <Image
              source={require("../../assets/images/Logo_2.png")}
              className="w-[100px] h-[51px]"
            />
          </View>
          <View className=" items-center bg-black">
            <Pressable
              className="bg-[#646464] border-2 border-white rounded-xl px-[8px] py-[11px] w-[298px] mb-8"
              onPress={() => setVisible(true)}>
              <View className="flex-row items-center gap-1">
                <Image
                  source={users}
                  className="w-[18px] h-[18px]"
                  resizeMode="contain"
                />
                <Text className="text-white tracking-[-0.32px] text-s font-manrope leading-5">
                  {selected || "Оберіть ваше місто"}
                </Text>
              </View>
            </Pressable>
            {/* Модалка */}
            <Modal
              visible={visible}
              transparent
              animationType="fade"
              onRequestClose={() => setVisible(false)}>
              <Pressable
                onPress={() => setVisible(false)}
                className="flex-1 justify-center items-center bg-black/60">
                <View className="bg-white w-[80%] rounded-lg p-4">
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => handleSelect(item)}
                        className="py-3 border-b border-gray-200">
                        <Text className="text-black text-center">{item}</Text>
                      </Pressable>
                    )}
                  />
                </View>
              </Pressable>
            </Modal>
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => router.push(`/student/instructor/${item.id}`)}
                  className="mb-4">
                  <View className="bg-[#1A1A1A] rounded-xl px-[10px] py-[12px] mb-4  w-[298px] border border-[#BDBDBD]">
                    <View className="flex-row items-center gap-x-4 mb-2">
                      <View className="flex-row items-center gap-x-[8px]">
                        <Image
                          source={require("../../assets/images/user.png")}
                          className="w-[20px] h-[20px]"
                        />
                        <Text className="text-white font-regular leading-6 text-[14px]">
                          Ім’я:
                        </Text>
                      </View>
                      <Text className="text-white font-bold text-m tracking-[-0.32px]">
                        {item.name}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-x-4 mb-2">
                      <View className="flex-row items-center gap-x-[8px]">
                        <Image
                          source={require("../../assets/images/auto.png")}
                          className="w-[15px] h-[11px]"
                        />
                        <Text className="text-white font-regular leading-6 text-[14px]">
                          Авто
                        </Text>
                      </View>
                      <Text className="text-white font-bold text-m tracking-[-0.32px]">
                        {item.car}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-x-9 ">
                      <View className="flex-row items-center gap-x-[12px]">
                        <Image
                          source={require("../../assets/images/kpp.png")}
                          className="w-[12px] h-[12px]"
                        />
                        <Text className="text-white font-regular leading-6 text-[14px]">
                          КП
                        </Text>
                      </View>
                      <Text className="text-white font-bold text-m tracking-[-0.32px]">
                        {item.transmission}
                      </Text>
                    </View>
                    {/* <Text className="text-white text-sm">🚘Авто: {item.car}</Text>
                <Text className="text-white text-sm">
                  ⚙️ КП: {item.transmission}
                </Text> */}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
