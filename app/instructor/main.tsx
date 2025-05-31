import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Main() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedService, setSelectedService] = useState("Сарни");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View className="flex-1">
      <View className="w-full h-14 bg-black justify-center items-center"></View>
      <ScrollView
        className="pb-15 px-[15px] relative"
        showsVerticalScrollIndicator={false}>
        <View className="max-w-[320px] mx-auto mb-4">
          <View className="flex-row justify-end mb-7">
            <View className="items-center">
              <Image
                source={require("../../assets/images/profile.png")}
                className=""
              />
              <Text className="text-profile text-xs">Профіль</Text>
            </View>
          </View>
          
          <View className="mb-7">
            <Text className="text-white text-[18px] font-manrope text-center leading-[22px]">
              👋Привіт, Сергій! Готовий до уроку?
            </Text>
          </View>
          <View className="mb-8">
            <Text className="text-white font-manrope text-[16px] tracking-[-0.32px]">
              ⏱ Вкажи, коли ти на зв&apos;язку - і тебе побачать учні поруч
            </Text>
          </View>
          <View className="flex-row gap-2 items-center mb-8">
            <TouchableOpacity onPress={() => setIsEnabled(!isEnabled)}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: isEnabled ? "#4ade80" : "#ccc",
                  justifyContent: "center",
                  padding: 3,
                }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    alignSelf: isEnabled ? "flex-end" : "flex-start",
                  }}
                />
              </View>
            </TouchableOpacity>

            <Text className="text-[16px] font-manrope leading-[22px] text-white tracking-[-0.32px]">
              {isEnabled ? "Ти зараз доступний" : "Ти зараз недоступний"}
            </Text>
          </View>
          {!isEnabled && (
            <View className="mt-4 w-full ">
              <Text className="text-white text-[18px] mb-5 font-manrope font-semibold">Сервісний Центр</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="flex-row items-center justify-between bg-[#646464] rounded-xl px-4 py-3 mb-14 border-2 w-full border-white mt-4">
                <Text className="text-white text-base">
                  {selectedService || "Оберіть місто"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#fff" />
              </TouchableOpacity>

              <Modal transparent visible={modalVisible} animationType="slide">
                <Pressable
                  className="flex-1 bg-black/30 justify-center px-5"
                  onPress={() => setModalVisible(false)}>
                  <View className="bg-white rounded-xl p-5">
                    {["Сарни", "Київ", "Львів"].map((city) => (
                      <TouchableOpacity
                        key={city}
                        onPress={() => {
                          setSelectedService(city);
                          setModalVisible(false);
                        }}
                        className="py-2">
                        <Text className="text-base text-black">{city}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </Pressable>
              </Modal>

              <TouchableOpacity className="mt-3 w-[full] bg-green py-[14px] px-6 rounded-[23px]">
                <Text className="text-btn text-center text-[18px]  font-bold  font-ptsansnaBold">
                  Підтвердити
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
