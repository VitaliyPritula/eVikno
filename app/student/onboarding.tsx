import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProgressBar } from "react-native-paper"; // або свій кастомний
import { style } from "twrnc";

const steps = [
  {
    title: "Тренуйся \n просто перед іспитом",
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
      router.replace("/student/welcom"); // Переходимо до головного екрану учня
    }
  };

  const { title, subtitle } = steps[step];

  return (
    <View className="flex-1 bg-black px-4 pt-12 justify-center relative">
      <StatusBar style="light" />

      {/* Прогрес */}
      <ProgressBar
        progress={(step + 1) / steps.length}
        color="#893DD7"
        style={style("h-1 my-1")}
      />

      {/* Контент */}
      <View style={style("flex-1 justify-center items-center")}>
        <View style={style("border-2 border-white  rounded-xl px-[10px] py-[16px]")}>
          <Text
            style={[style("text-white text-[20px] leading-[25px] px-[10px] font-bold text-center mb-8"), { fontFamily: "ptsansnaBold" },]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[style("text-white text-m text-center px-[10px]"), {fontFamily:"manrope"},]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {/* Кнопка "Далі" */}
      <TouchableOpacity
        style={style("bg-[#4F525D] py-3 px-5 rounded-full mb-10 flex-row items-center justify-center ml-auto")}
        onPress={handleNext}>
        <Text style={[style("text-white font-bold text-bas"), {fontFamily:"manrope"},]}>Далі</Text>
        <Icon name="chevron-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
