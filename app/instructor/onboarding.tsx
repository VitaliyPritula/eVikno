import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "react-native-paper"; // або свій кастомний
import Icon from "react-native-vector-icons/Ionicons";

const steps = [
  {
    title: "Твоя експертиза потрібна зараз",
    subtitle:
      "Отримуй запити на екзаменаційний маршрут напряму від учнів під час очікування іспиту в СЦ.",
  },
  {
    title: "Твій графік — твоя справа",
    subtitle:
      "Увімкни додаток, коли хочеш працювати. Сформуй зручний час — решту зробимо ми.",
  },
  {
    title: "Щомісячно фіксована підписка",
    subtitle:
      "Без комісій з кожного заняття. Один раз на місяць — прозоро та вигідно.",
    text: "Перші 7 днів — безкоштовно",
  },
];

export default function StudentOnboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.replace("/instructor/welcom"); // Переходимо до головного екрану учня
    }
  };

  const { title, subtitle, text } = steps[step];

  return (
    <View className="flex-1 bg-black px-4 pt-12 justify-center relative">
      <StatusBar style="light" />
      {/* Прогрес */}
      <ProgressBar
        progress={(step + 1) / steps.length}
        color="#893DD7"
        className="py-1"
      />
      {/* Контент */}
      <View className="flex-1 justify-center items-center">
        <View className="border-2 border-white rounded-xl px-[10px] py-[16px]">
          <Text className="text-white text-[22px] leading-[25px] font-bold text-center mb-8 font-ptsansnaBold">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-white text-[14px] tracking-[-0.32px] text-center font-manrope">
              {subtitle}
            </Text>
          )}
        </View>
        <View>
          {text && (
            <Text className="text-[17px] text-warning text-center absolute -right-36 font-bold top-40 tracking-[-0.30px] font-manrope">
              {text}
            </Text>
          )}
        </View>
      </View>

      {/* Кнопка "Далі" */}
      <TouchableOpacity
        className="bg-btn-next py-3 px-5 rounded-full mb-10 flex-row items-center justify-center ml-auto"
        onPress={handleNext}>
        <Text className="text-white font-bold text-base font-manrope">
          Далі
        </Text>
        <Icon name="chevron-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
