import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProgressBar } from "react-native-paper"; // або свій кастомний
import tw from "twrnc";

const steps = [
  {
    title: "Тренуйся просто перед іспитом",
    subtitle:
      "Сконтактуй з вільним інструктором, поки чекаєш на іспит і проїдь маршрут ще раз.",
  },
  {
    title: "ТЗнайди інструктора поруч з СЦ за 3 кліки",
    subtitle:
      "Бачиш усіх доступних поруч. \n Просто обери.",
  },
  {
    title: "Твоя впевненість — вже поруч",
    subtitle:
      "Наша платформа допоможе знайти підтримку саме тоді, коли вона найбільше потрібна.",
  },
];

export default function StudentOnboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      router.replace("/student"); // Переходимо до головного екрану учня
    }
  };

  const { title, subtitle, text } = steps[step];

  return (
    <View style={tw`flex-1 bg-black px-4 justify-center relative`}>
      <StatusBar style="light" />

      {/* Прогрес */}
      <ProgressBar
        progress={(step + 1) / steps.length}
        color="#893DD7"
        style={tw`h-1 my-1`}
      />

      {/* Контент */}
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`border-2 border-white  rounded-xl py-4 `}>
          <Text
            style={tw`text-white text-[20px] font-bold text-center mb-8 !font-ptsansnarrow`}>
            {title}
          </Text>
          {subtitle && (
            <Text style={tw`text-white text-m text-center tracking-[-0.30px]`}>
              {subtitle}
            </Text>
          )}
        </View>
        <View>
          {text && (
            <Text
              style={tw`text-white text-m text-[#F89C3A] text-center absolute -right-20 top-40 tracking-[-0.30px]`}>
              {text}
            </Text>
          )}
        </View>
      </View>

      {/* Кнопка "Далі" */}
      <TouchableOpacity
        style={tw`bg-[#4F525D] py-3 px-5 rounded-full mb-10 flex-row items-center justify-center ml-auto`}
        onPress={handleNext}>
        <Text style={tw`text-white font-bold text-base`}>Далі</Text>
        <Icon name="chevron-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
