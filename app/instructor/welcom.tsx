import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { router, Link, useRouter } from "expo-router";
import { style } from "twrnc";
import check from "../../assets/images/check.png";
import checkring from "../../assets/images/check_ring.png";
import bellpin from "../../assets/images/Bell_pin.png";
import users from "../../assets/images/users.png";
import Logo from "../../assets/images/Logo.png";

export default function StudentScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    //router.push("/instructor/register"); // ⬅️ Переходить на сторінку реєстрації
    router.push("/instructor/signup"); // ⬅️ Переходить на сторінку реєстрації
  };

  return (
    <View style={style("flex-1")}>
      {/* Фіксований хедер */}
      <View style={style("w-full h-14 bg-black justify-center items-center")}>
        <Text style={style("text-white text-base font-bold")}></Text>
      </View>

      {/* Пролистуваний вміст */}
      <ScrollView
        contentContainerStyle={style("pb-15 px-[15px] items-center")}
        showsVerticalScrollIndicator={false}
      >
        <View style={style("max-w-[320px] mx-auto pt-6")}>
          <Text
            style={[
              style("text-white text-[17px] leading-[25px] mb-3 font-bold"),
              { fontFamily: "manrope" },
            ]}
          >
            Профіль активовано — тепер тебе можуть знайти учні!
          </Text>

          <View style={style("flex-row items-start mb-4 w-full relative")}>
            <Image
              source={check}
              style={style("w-5 h-[18px] top-2 absolute")}
              resizeMode="contain"
            />
            <Text
              style={[
                style("text-white text-[15px] leading-[20px] text-center tracking-[-0.32px] mb-8"),
                { fontFamily: "manrope" },
              ]}
            >
              Увімкни доступність, налаштуй графік — і вже сьогодні зможеш
              отримати перший запит від учня.
            </Text>
          </View>
          <Text style={style("text-white mb-5 text-[18px] font-bold")}>Що далі</Text>
          <View>
            <View
              style={style("border-2 rounded-xl border-[#C7C7C7] bg-[grey] w-[245px] flex items-center justify-center p-3 mb-3")}
            >
              <Image
                source={checkring}
                style={style("w-[32px] h-[32px] mb-2")}
                resizeMode="contain"
              />
              <Text
                style={style("text-white text-[16px] leading-[22px] text-center w-[188px] tracking-[-0.32px]")}
              >
                Увімкни статус &quot;Доступний&quot;
              </Text>
            </View>
            <View
              style={style("border-2 rounded-xl border-[#C7C7C7] bg-[grey] w-[245px] flex items-center justify-center p-[13px] transform translate-x-20 mb-3")}
            >
              <Image
                source={bellpin}
                style={style("w-[32px] h-[32px] mb-2")}
                resizeMode="contain"
              />
              <Text
                style={style("text-white text-center  text-[16px] tracking-[-0.32px]")}
              >
                Підтримай учнів, що чекають на іспит біля СЦ
              </Text>
            </View>
            <View
              style={style("border-2 rounded-xl border-[#C7C7C7] bg-[grey] w-[265px] flex items-center justify-center py-3 mb-3")}
            >
              <Image
                source={users}
                style={style("w-[32px] h-[32px] mb-2")}
                resizeMode="contain"
              />
              <Text
                style={style("text-white text-[16px] leading-[22px] text-center  tracking-[-0.36px]")}
              >
                Підтверджуй, контактуй, допомагай
              </Text>
            </View>
            <View style={style("pt-[30px]")}>
              <Text
                style={[
                  style("text-white text-center text-[13px] tracking-[-0.36px]"),
                  { fontFamily: "manrope" },
                ]}
              >
                Учні хочуть повторити маршрут перед іспитом і заспокоїтись.
              </Text>
            </View>
            <View style={style("pt-[12px]")}>
              <Text
                style={[
                  style("text-white text-center text-[18px] mb-4 font-semibold"),
                  { fontFamily: "manrope" },
                ]}
              >
                Твоя підтримка - дуже важлива!
              </Text>
              <Image
                source={Logo}
                style={style("w-[50px] h-[50px] mb-2 mx-auto mb-8")}
                resizeMode="contain"
              />
              <Text
                style={[
                  style("text-white text-[16px] leading-[22px] mb-3 font-bold"),
                  { fontFamily: "manrope" },
                ]}
              >
                Без комісій.{"\n"}Щомісячна підписка 1590 грн
              </Text>
              <Text
                style={[
                  style("text-[17px] text-[#F89C3A] font-bold tracking-[-0.30px] mb-[14px]"),
                  { fontFamily: "manrope" },
                ]}
              >
                Перші 7 днів — безкоштовно.
              </Text>
              <TouchableOpacity
                onPress={handleRegister}
                style={style("bg-[#8BD73D] py-[14px] px-6 rounded-[23px]")}
              >
                <Text
                  style={[
                    style("text-btn text-center text-[18px]  font-bold"),
                    { fontFamily: "ptsansnaBold" },
                  ]}
                >
                  Зареєструватись
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push("/instructor/pdf-viewer?file=privacy")
                }
              >
                <Text
                  style={style("text-white text-[16px] tracking-[-0.32px] underline mt-8")}
                >
                  Політика конфіденційності
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/instructor/pdf-viewer?file=terms")}
              >
                <Text
                  style={style("text-white text-[16px] tracking-[-0.32px] underline mt-3 !w-full")}
                >
                  Правила користування платформою
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
