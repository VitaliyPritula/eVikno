import { SIGNUP_ERROR_MESSAGES } from "@/constants/firebaseErrors";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { style } from "twrnc";
import emailImg from "../../assets/images/email.png";
import google from "../../assets/images/google.png";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errSignup, setErrSignup] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signUp = useAuthStore((state) => state.signUp);
  //const { signIn, signUp, signOut, user, loading } = useAuthStore();
  // поки не треба
  // const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    const newErrors = {
      email: email.includes("@") ? "" : "Введіть коректний email",
      password:
        password.length >= 6 ? "" : "Пароль повинен бути не менше 6 символів",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    try {
      await signUp(email, password);
      console.log("Успішна реэстрація:");
      router.push("/instructor/register"); // після успішного логіну
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg =
          SIGNUP_ERROR_MESSAGES[error.code] ||
          "Сталася помилка. Спробуйте пізніше";
        setErrSignup(errorMsg);
        console.error("SignUp Error:", error);
      } else {
        console.error("Невідома помилка:", error);
        setErrSignup("Сталася помилка");
      }
    }

    // const hasError = Object.values(newErrors).some((e) => e !== "");
    // if (hasError) return;

    // console.log("Логін:", { email, password, rememberMe });
  };

  return (
    <View style={style("flex-1 bg-black")}>
      <ScrollView
        contentContainerStyle={style("py-15 px-4")}
        showsVerticalScrollIndicator={false}
      >
        <View style={style("max-w-[320px] w-full mx-auto")}>
          <Text
            style={[
              style(
                "text-white text-[18px] text-center leading-[22px] mb-3 font-bold"
              ),
              { fontFamily: "manrope" },
            ]}
          >
            Реєстрація
          </Text>{" "}
          <Text
            style={[
              style(
                "text-[#C7C7C7] text-[16px] text-center leading-[22px] tracking-[-0.32px] mb-6 font-bold"
              ),
              { fontFamily: "manrope" },
            ]}
          >
            Введіть свою електронну адресу та Пароль
          </Text>
          {/* Email */}
          <View style={style("mb-4")}>
            <View
              style={style(
                `flex-row items-center border-2 rounded-[12px] p-[10px]  text-white bg-[#646464]`,
                errors.email ? "border-red-500" : "border-[#BDBDBD]"
              )}
            >
              <Image
                source={emailImg}
                style={style("w-[24px] h-[24px]")}
                resizeMode="contain"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="example@mail.com"
                placeholderTextColor="#fff"
                style={style()}
              />
            </View>
            {errSignup && (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errSignup}
              </Text>
            )}
            {errors.email && (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errors.email}
              </Text>
            )}
          </View>
          {/* Password */}
          <View style={style("mb-6")}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="password"
              placeholderTextColor="#646464"
              style={style(
                `border-2 rounded-[23px] px-4 py-3 text-white bg-[#646464]`,
                errors.password ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.password ? (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errors.password}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm mt-1")}>
                Мінімум 8 символів
              </Text>
            )}
          </View>
          <View style={style("mb-6")}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="password"
              placeholderTextColor="#646464"
              style={style(
                `border-2 rounded-[23px] px-4 py-3 text-white bg-[#646464]`,
                errors.password ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.password ? (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errors.password}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm mt-1")}>
                Мінімум 8 символів
              </Text>
            )}
          </View>
          <Pressable
            onPress={handleSignup}
            style={style("bg-[#8BD73D] w-full py-3 rounded-xl")}
          >
            <Text
              style={[
                style("text-center text-black text-lg font-bold"),
                { fontFamily: "ptsansnaBold" },
              ]}
            >
              Зареєструватись
            </Text>
          </Pressable>
        </View>
        <View style={style("mt-6 items-center")}>
          <Text
            style={[
              style(
                "text-center text-[#C7C7C7] text-[16px] mb-5 font-bold tracking-[-0.32px]"
              ),
              { fontFamily: "ptsansnaBold" },
            ]}
          >
            Зареєструватись за допомогою{" "}
          </Text>
          <Image
            source={google}
            style={style("w-[44px] h-[44px] mb-6")}
            resizeMode="contain"
          />

          <Text style={style("text-[#D7D7D7] text-[16px]")}>
            Вже э аккаунт?{" "}
            <Text
              onPress={() => router.push("/instructor/signin")}
              style={[
                style("text-[#F89C3A] text-[19px] font-bold"),
                { fontFamily: "manrope" },
              ]}
            >
              Увійти
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
