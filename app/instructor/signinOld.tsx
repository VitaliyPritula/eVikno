import { SIGNIN_ERROR_MESSAGES } from "@/constants/firebaseErrors";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";

import React, { useState } from "react";
import {
  Pressable,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { style } from "twrnc";

import Octicons from "@expo/vector-icons/Octicons";
import user from "../../assets/images/user.png";
import passwordImg from "../../assets/images/password.png";
import { useAuthStore } from "@/store/authStore";

export default function LoginScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  //const { signIn, signUp, signOut, user, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errSignin, setErrSignin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const newErrors = {
      email: email.includes("@") ? "" : "Введіть коректний email",
      password:
        password.length >= 6 ? "" : "Пароль повинен бути не менше 6 символів",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    try {
      await signIn(email, password);
      console.log("Успішний логін:");
      router.push("/instructor/initial-profile"); // треба буде змінити на головну сторінку шнструктора
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg =
          SIGNIN_ERROR_MESSAGES[error.code] ||
          "Сталася помилка. Спробуйте пізніше";
        setErrSignin(errorMsg);
        console.error("SignIn Error:", error);
      } else {
        console.error("Невідома помилка:", error);
        setErrSignin("Сталася помилка");
      }
    }
  };

  return (
    <View style={style("flex-1 bg-black pt-[40px]")}>
      <View className="w-full h-14 bg-black justify-center items-center">
        {/* <Text className="text-white text-base font-bold">Увійти</Text> */}
      </View>

      <ScrollView
        contentContainerStyle={style("pb-15 px-4 pt-[32px]")}
        showsVerticalScrollIndicator={false}
      >
        <View style={style("max-w-[320px] w-full mx-auto")}>
          <Text
            style={[
              style(
                "text-white text-[18px] text-center leading-[22px] mb-[12px] font-bold"
              ),
              { fontFamily: "manrope" },
            ]}
          >
            Увійти
          </Text>
          <Text
            style={[
              style(
                "text-[#C7C7C7] tracking-[-0.32px] text-[14px] text-center leading-[22px] mb-6 font-bold"
              ),
              { fontFamily: "manrope" },
            ]}
          >
            {/* Введіть електронну адресу та пароль
            ]}
          > */}
            Вхід у профіль інструктора
          </Text>
          {/* Email */}
          <View style={style("mb-4")}>
            <View
              style={style(
                `flex-row items-center border-2 rounded-[12px] px-[10px] bg-[#646464]`,
                errors.email ? "border-red-500" : "border-[#BDBDBD]"
              )}
            >
              <Image source={user} style={style("w-[24px] h-[24px] mr-2")} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Електронна адреса"
                placeholderTextColor="#fff"
                style={style(
                  `w-[82%] px-1 py-3 text-white bg-[#646464]`,
                  errors.email ? "border-red-500" : "border-gray-500"
                )}
              />
            </View>
            {errSignin && (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errSignin}
              </Text>
            )}
          </View>
          {/* Password */}
          <View style={style("mb-6")}>
            <View
              style={style(
                `flex-row items-center border-2 rounded-[12px] px-[10px] bg-[#646464]`,
                errors.email ? "border-red-500" : "border-[#BDBDBD]"
              )}
            >
              <Image
                source={passwordImg}
                style={style("w-[24px] h-[24px] mr-2")}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Пароль"
                placeholderTextColor="#fff"
                style={style(
                  ` w-[82%] px-1 py-3 text-white bg-[#646464]`,
                  errors.password ? "border-red-500" : "border-gray-500"
                )}
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Octicons
                  name={showPassword ? "eye-closed" : "eye"}
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>
          <Pressable
            onPress={handleLogin}
            style={style("bg-[#8BD73D] w-full py-3 rounded-[23px")}
          >
            <Text
              style={[
                style("text-center text-black text-lg font-bold"),
                { fontFamily: "ptsansnaBold" },
              ]}
            >
              Увійти
            </Text>
          </Pressable>
        </View>
        <View style={style("mt-6 items-center")}>
          <Text style={style("text-[#D7D7D7] text-sm")}>
            Немає акаунту?{" "}
            <Text
              onPress={() => router.push("/instructor/signup")}
              style={style("text-[#8BD73D]")}
            >
              Зареєструватися
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
