import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useServiceCentersStore } from "../../store/useServiceCentersStore";
import { getFreeInstructors } from "../../store/getFreeInstructors";
import { InstructorProfile } from "@/types/instructorType";
import { ServiceCenter } from "../../types/serviceCenterType";

import mapIcon from "../../assets/images/map.png";
import logo from "../../assets/images/Logo_2.png";
import userIcon from "../../assets/images/user.png";
import autoIcon from "../../assets/images/auto.png";
import kppIcon from "../../assets/images/kpp.png";

export default function StudentScreen() {
  const [selectedCity, setSelectedCity] = useState("");
  const [visibleCityModal, setVisibleCityModal] = useState(false);
  const [activeModal, setActiveModal] = useState<"city" | "center" | null>(
    null
  );

  const [selectedService, setSelectedService] = useState<ServiceCenter | null>(
    null
  );
  const [instructors, setInstructors] = useState<InstructorProfile[]>([]);
  const [loadingInstructors, setLoadingInstructors] = useState(false);

  const centers = useServiceCentersStore((state) => state.centers);
  const router = useRouter();

  const cities = Array.from(new Set(centers.map((c) => c.city)));

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedService(null);
    setVisibleCityModal(false);
    setInstructors([]);
  };

  const handleSelectServiceCenter = async (center: ServiceCenter) => {
    setSelectedService(center);
    setActiveModal(null);
    setLoadingInstructors(true);

    try {
      const fetchedInstructors = await getFreeInstructors(center.id);

      // Прибираємо дублікати
      const unique = new Map<string, InstructorProfile>();
      fetchedInstructors.forEach((i) => unique.set(i.uidInstructor, i));

      setInstructors(Array.from(unique.values()));
    } catch (e) {
      console.error("Помилка завантаження інструкторів:", e);
      setInstructors([]);
    }

    setLoadingInstructors(false);
  };

  const renderInstructorItem = ({ item }: { item: InstructorProfile }) => (
    <TouchableOpacity
      onPress={() => router.push(`/student/instructor/${item.uidInstructor}`)}
      className="mb-4">
      <View className="bg-[#1A1A1A] rounded-xl px-[10px] py-[12px] w-[298px] border border-[#BDBDBD]">
        <View className="flex-row items-center gap-x-4 mb-2">
          <Image source={userIcon} className="w-[20px] h-[20px]" />
          <Text className="text-white text-[14px]">Ім’я:</Text>
          <Text className="text-white font-bold text-m tracking-[-0.32px]">
            {item.name}
          </Text>
        </View>
        <View className="flex-row items-center gap-x-4 mb-2">
          <Image source={autoIcon} className="w-[15px] h-[11px]" />
          <Text className="text-white text-[14px]">Авто:</Text>
          <Text className="text-white font-bold text-m tracking-[-0.32px]">
            {item.carModel}
          </Text>
        </View>
        <View className="flex-row items-center gap-x-4">
          <Image source={kppIcon} className="w-[12px] h-[12px]" />
          <Text className="text-white text-[14px]">КП:</Text>
          <Text className="text-white font-bold text-m tracking-[-0.32px]">
            {item.transmission}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black px-4 pt-16">
      <ScrollView
        className="pb-20 px-[15px]"
        showsVerticalScrollIndicator={false}>
        <View className="max-w-[320px] mx-auto">
          <View className="items-center mb-5">
            <Image source={logo} className="w-[100px] h-[51px]" />
          </View>

          {/* Вибір міста */}
          <Pressable
            className="bg-[#646464] border-2 border-white rounded-xl px-[8px] py-[11px] w-[298px] mb-4"
            onPress={() => setVisibleCityModal(true)}>
            <View className="flex-row items-center gap-1">
              <Image source={mapIcon} className="w-[18px] h-[18px]" />
              <Text className="text-white">
                {selectedCity || "Оберіть ваше місто"}
              </Text>
            </View>
          </Pressable>

          {/* Модалка міста */}
          <Modal
            visible={visibleCityModal}
            transparent
            animationType="fade"
            onRequestClose={() => setVisibleCityModal(false)}>
            <Pressable
              onPress={() => setVisibleCityModal(false)}
              className="flex-1 justify-center items-center bg-black/60">
              <View className="bg-white w-[80%] rounded-lg p-4">
                <FlatList
                  data={cities}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => handleSelectCity(item)}
                      className="py-3 border-b border-gray-200">
                      <Text className="text-black text-center">{item}</Text>
                    </Pressable>
                  )}
                />
              </View>
            </Pressable>
          </Modal>

          {!!selectedCity && (
            <TouchableOpacity
              onPress={() => setActiveModal("center")}
              className="flex-row items-center justify-between bg-[#646464] rounded-xl px-4 py-3 mb-6 border-2 border-white mt-2">
              <Text className="text-white text-base">
                {selectedService
                  ? `${selectedService.id} – ${selectedService.address}`
                  : "Сервісний центр не обрано"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Модалка СЦ */}
          <Modal
            transparent
            visible={activeModal === "center"}
            animationType="slide">
            <Pressable
              className="flex-1 bg-black/30 justify-center px-5"
              onPress={() => setActiveModal(null)}>
              <View className="bg-white rounded-xl p-5">
                {centers
                  .filter((c) => c.city === selectedCity)
                  .map((center) => (
                    <TouchableOpacity
                      key={center.id}
                      onPress={() => handleSelectServiceCenter(center)}
                      className="py-2">
                      <Text className="text-base text-black">
                        {center.id} — {center.address}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </Pressable>
          </Modal>

          {/* Вивід інструкторів */}
          {loadingInstructors ? (
            <ActivityIndicator size="large" color="#fff" className="my-6" />
          ) : instructors.length === 0 ? (
            <Text className="text-white text-center mt-6">
              Немає доступних інструкторів
            </Text>
          ) : (
            <FlatList
              data={instructors}
              keyExtractor={(item) => item.uidInstructor}
              renderItem={renderInstructorItem}
              scrollEnabled={false}
              className="mt-4"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
