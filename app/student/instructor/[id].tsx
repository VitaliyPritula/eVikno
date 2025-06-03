import React from "react";
import { View, Text, Pressable, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const makeCall = (phone: string) => {
  Linking.openURL(`tel:${phone}`);
};

const instructors = [
  {
    id: "1",
    name: "Сергій Коваль",
    price: "500грн",
    phone: "+38 097 874 66 32",
    car: "Skoda Octavia",
    transmission: "Автомат",
    licensePlate: "ВК 4536 НХ",
    experience: "6 років",
    certificate: "098 564",
    city: "Сарни",
  },
  {
    id: "2",
    name: "Іван Михайлов",
    price: "500грн",
    phone: "+38 067 123 45 67",
    car: "Skoda Octavia",
    transmission: "Механіка",
    licensePlate: "АА 1234 ВХ",
    experience: "5 років",
    certificate: "123 456",
    city: "Рівне",
  },
  {
    id: "3",
    name: "Ірина Ткач",
    price: "520грн",
    phone: "+38 050 987 65 43",
    car: "Hyundai i30",
    transmission: "Механіка",
    licensePlate: "КА 9876 НМ",
    experience: "7 років",
    certificate: "789 012",
    city: "Київ",
  },
];

export default function InstructorDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const instructor = instructors.find((inst) => inst.id === id);

  if (!instructor) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-4">
        <Text className="text-white text-xl font-bold">
          Інструктор не знайдений
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 flex-row items-center bg-gray-700 px-4 py-2 rounded"></Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 py-20   mx-auto bg-black px-1">
      <Pressable
        onPress={() => router.back()}
        className="self-start mb-11 flex-row items-center px-4 py-2 rounded">
        <Icon
          name="chevron-forward"
          size={28}
          color="#fff"
          className=" transform rotate-180"
        />
        <Text className="text-white font-manrope font-regular text-m">
          Назад
        </Text>
      </Pressable>
      <View className="bg-grey border-2 w-[320px] border-white  rounded-xl px-[8px] py-[12px]  mb-8">
        <Text className="text-white text-sm font-semibold font-manrope mb-4">
          {instructor.name}
        </Text>
        <View className="flex-row justify-between mb-5">
          <Text className="text-textcolor mb-2 font-manrope">Ціна</Text>
          <Text className="text-white mb-2 font-manrope text-m tracking-[-0.32px]">
            {instructor.price}
          </Text>
        </View>
        <View className="flex-row justify-between items-center gap-x-2">
          <Entypo
            name="phone"
            size={24}
            color="#C7C7C7"
            className="transform rotate-90"
          />
          <Text className="text-white mb-2 text-m tracking-[-0.32px] font-manrope">
            {instructor.phone}
          </Text>
        </View>
      </View>
      <View className="mb-5">
        <Text className="text-white text-left text-sm font-manrope">Опис</Text>
      </View>

      <View className="bg-grey border-2 w-[320px] border-white rounded-xl px-[12px] py-[16px] mb-8">
        <View className="flex-row justify-between mb-5">
          <View className="gap-y-3">
            <Text className="text-textcolor font-manrope text-s mb-8">
              Деталі авто
            </Text>
            <Text className="text-textcolor font-manrope text-s">
              Номер авто
            </Text>
            <Text className="text-textcolor font-manrope text-s">Досвід</Text>
            <Text className="text-textcolor font-manrope text-s">Атестат</Text>
          </View>
          <View className="items-start gap-y-3">
            <View>
              <Text className="text-white font-manrope text-[15px] tracking-[-0.32px]">
                {instructor.car}
              </Text>
              <Text className="text-white font-manrope text-[15px] tracking-[-0.32px]">
                {instructor.transmission}
              </Text>
            </View>
            <Text className="text-white font-manrope text-[15px] tracking-[-0.32px]">
              {instructor.licensePlate}
            </Text>
            <Text className="text-white font-manrope text-[15px] tracking-[-0.32px]">
              {instructor.experience}
            </Text>
            <Text className="text-white font-manrope text-[15px] tracking-[-0.32px]">
              {instructor.certificate}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => makeCall(instructor.phone)}
        className="bg-green  mt-6 px-6 py-3 rounded-3xl">
        <Text className="text-btn text-sm font-ptsansnaBold text-center text-base">
          Зателефонувати
        </Text>
      </TouchableOpacity>
    </View>
  );
}
