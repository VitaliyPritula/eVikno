import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//import { Picker } from "@react-native-picker/picker"; //??? Нам це потрібно?
import { useAuthStore } from "@/store/authStore";
import { FirebaseError } from "firebase/app";

export default function Main() {
  const toggleIsFree = useAuthStore((state) => state.toggleIsFree);
  const profile = useAuthStore((state) => state.profile);
  const loading = useAuthStore((state) => state.loading);
  console.log("profile", profile?.isFree);
  console.log("proile", profile);

  const [isEnabled, setIsEnabled] = useState(false); // початковий стан вимкнений
  const [selectedService, setSelectedService] = useState("Оберіть місто");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showError, setShowError] = useState("");

  useEffect(() => {
    if (profile?.isFree !== undefined) {
      setIsEnabled(profile.isFree);
    }
    if (profile?.serviceCenter) {
      setSelectedService(profile.serviceCenter);
    }
  }, [profile]);

  const handleToggle = () => {
    try {
      if (profile) {
        //  setHideSelectedService(isEnabled);
        const serviceCenter = isEnabled === false ? "" : selectedService;

        toggleIsFree(isEnabled, serviceCenter);
        // це треба красивно зробити !!!!!!!
        alert(
          `Статус успішно змінено на ${isEnabled ? "Вільний" : "Зайнятий"}`
        );
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg = "Помилка при зміні статусу: ";

        setShowError(errorMsg);
        console.error("Toggle Error:", error);
      } else {
        console.error("Невідома помилка in Toggle:", error);
        setShowError("Сталася помилка");
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#4ade80" />
        <Text className="text-white mt-4">Завантаження профілю...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 container">
      <ScrollView className="pb-15  pt-4 " showsVerticalScrollIndicator={false}>
        <View className="mx-auto mb-4">
          <View className="flex-row justify-end mb-7">
            <Pressable
              className="items-center"
              onPress={() => router.push("/instructor/profile")}
            >
              <FontAwesome name="user-circle-o" size={24} color="#893dd7" />
              <Text className="text-profile text-xs">Профіль</Text>
            </Pressable>
          </View>
          <View className="mb-7">
            <Text className="text-white text-[18px] font-manrope text-center leading-[22px]">
              👋Привіт{profile?.name ? `, ${profile.name}` : ""}. Готовий до
              уроку?
            </Text>
          </View>
          <View className="mb-8">
            <Text className="text-white font-manrope text-[16px] tracking-[-0.32px]">
              ⏱ Вкажи, коли ти на зв&apos;язку - і тебе побачать учні поруч
            </Text>
          </View>
          {!profile && (
            <Text className="text-red-500 text-s mb-4">
              Заповніть профіль, щоб увімкнути статус
            </Text>
          )}
          {typeof showError === "string" && showError.length > 0 && (
            <Text className="text-red-500 text-s mb-4">{showError}</Text>
          )}
          <View className="flex-row gap-2 items-center mb-8">
            <TouchableOpacity
              onPress={() => {
                if (profile) {
                  setIsEnabled(!isEnabled);
                }
              }}
              activeOpacity={profile ? 0.7 : 1}
              disabled={!profile}
            >
              <View
                style={{
                  width: 50,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: profile
                    ? isEnabled
                      ? "#4ade80"
                      : "#ccc"
                    : "#aaa",
                  justifyContent: "center",
                  padding: 3,
                  opacity: profile ? 1 : 0.5,
                }}
              >
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
            {/* я змінила текст потім з Ольгою обговоримо */}
            <Text className="text-[16px] font-manrope leading-[22px] text-white tracking-[-0.32px]">
              {isEnabled
                ? 'Відключити статус "Вільний"'
                : 'Увімкнути статус "Вільний"'}
            </Text>
          </View>
          {/* Ganna  я змінила */}

          <View className="mt-4 w-full ">
            <Text className="text-white text-[18px] mb-5 font-manrope font-semibold">
              Сервісний Центр
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-row items-center justify-between bg-[#646464] rounded-xl px-4 py-3 mb-14 border-2 w-full border-white mt-4"
            >
              <Text className="text-white text-base">
                {selectedService || "Оберіть місто"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </TouchableOpacity>

            <Modal transparent visible={modalVisible} animationType="slide">
              <Pressable
                className="flex-1 bg-black/30 justify-center px-5"
                onPress={() => setModalVisible(false)}
              >
                <View className="bg-white rounded-xl p-5">
                  {["Сарни", "Київ", "Львів"].map((city) => (
                    <TouchableOpacity
                      key={city}
                      onPress={() => {
                        setSelectedService(city);
                        setModalVisible(false);
                      }}
                      className="py-2"
                    >
                      <Text className="text-base text-black">{city}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Pressable>
            </Modal>
          </View>

          <TouchableOpacity
            onPress={handleToggle}
            className="mt-3 w-[full] bg-green py-[14px] px-6 rounded-[23px]"
          >
            <Text className="text-btn text-center text-[18px]  font-bold  font-ptsansnaBold">
              Підтвердити
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
