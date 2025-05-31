import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import bellpin from "../../assets/images/Bell_pin.png";
import check from "../../assets/images/check.png";
import checkring from "../../assets/images/check_ring.png";
import Logo from "../../assets/images/Logo.png";
import users from "../../assets/images/users.png";

export default function StudentScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    //router.push("/instructor/register"); // ⬅️ Переходить на сторінку реєстрації
    router.push("/instructor/signup"); // ⬅️ Переходить на сторінку реєстрації
  };

  return (
    <View className="flex-1">
      {/* Фіксований хедер */}
      <View className="w-full h-14 bg-black justify-center items-center"></View>
      {/* Пролистуваний вміст */}
      <ScrollView className="pb-15" showsVerticalScrollIndicator={false}>
        <View className="max-w-[320px] mx-auto pt-6">
          <Text className="text-white text-[17px] leading-[25px] mb-3 font-bold font-manrope">
            Профіль активовано — тепер тебе можуть знайти учні!
          </Text>

          <View className="flex-row items-start mb-4 w-full relative">
            <Image
              source={check}
              className="w-5 h-[18px] top-2 absolute"
              resizeMode="contain"
            />
            <Text className="text-white text-[15px] leading-[20px] text-center tracking-[-0.32px] mb-8 font-manrope">
              Увімкни доступність, налаштуй графік — і вже сьогодні зможеш
              отримати перший запит від учня.
            </Text>
          </View>
          <Text className="text-white mb-5 text-[18px] font-bold">Що далі</Text>
          <View>
            <View className="border-2 rounded-xl border-textcolor bg-grey w-[245px] flex items-center justify-center p-3 mb-3">
              <Image
                source={checkring}
                className="w-[32px] h-[32px] mb-2"
                resizeMode="contain"
              />
              <Text className="text-white text-[16px] leading-[22px] text-center w-[188px] tracking-[-0.32px]">
                Увімкни статус &quot;Доступний&quot;
              </Text>
            </View>
            <View className="border-2 rounded-xl border-textcolor bg-[grey] w-[245px] flex items-center justify-center p-[13px] transform translate-x-20 mb-3">
              <Image
                source={bellpin}
                className="w-[32px] h-[32px] mb-2"
                resizeMode="contain"
              />
              <Text className="text-white text-center  text-[16px] tracking-[-0.32px]">
                Підтримай учнів, що чекають на іспит біля СЦ
              </Text>
            </View>
            <View className="border-2 rounded-xl border-textcolor bg-[grey] w-[265px] flex items-center justify-center py-3 mb-3">
              <Image
                source={users}
                className="w-[32px] h-[32px] mb-2"
                resizeMode="contain"
              />
              <Text className="text-white text-[16px] leading-[22px] text-center  tracking-[-0.36px]">
                Підтверджуй, контактуй, допомагай
              </Text>
            </View>
            <View className="pt-[30px]">
              <Text className="text-white text-center text-[13px] tracking-[-0.36px] font-manrope">
                Учні хочуть повторити маршрут перед іспитом і заспокоїтись.
              </Text>
            </View>
            <View className="pt-[12px]">
              <Text className="text-white text-center text-[18px] mb-4 font-semibold font-manrope">
                Твоя підтримка - дуже важлива!
              </Text>
              <Image
                source={Logo}
                className="w-[50px] h-[50px] mb-2 mx-auto mb-8"
                resizeMode="contain"
              />
              <Text className="text-white text-[16px] leading-[22px] mb-3 font-bold font-manrope">
                Без комісій.{"\n"}Щомісячна підписка 1590 грн
              </Text>
              <Text className="text-[17px] text-warning font-bold tracking-[-0.30px] mb-[14px] font-manrope">
                Перші 7 днів — безкоштовно.
              </Text>
              <TouchableOpacity
                className="bg-green py-[14px] px-6 rounded-[23px]"
                onPress={handleRegister}>
                <Text className="text-btn text-center text-[18px]  font-bold  font-ptsansnaBold">
                  Зареєструватись
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push("/instructor/pdf-viewer?file=privacy")
                }>
                <Text className="text-white text-[16px] tracking-[-0.32px] underline mt-8">
                  Політика конфіденційності
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-10"
                onPress={() =>
                  router.push("/instructor/pdf-viewer?file=terms")
                }>
                <Text className="text-white text-[16px] tracking-[-0.32px] underline mt-3 !w-full">
                  Правила користування платформою
                </Text>
              </TouchableOpacity>
              <Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
