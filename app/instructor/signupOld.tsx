import React, { useState } from "react";
import { router } from "expo-router";
import { SIGNUP_ERROR_MESSAGES } from "@/constants/firebaseErrors";
import { useAuthStore } from "@/store/authStore";
import { FirebaseError } from "firebase/app";
import InputFieldSign from "@/components/forms/InputFieldSign";

import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { style } from "twrnc";
import emailImg from "../../assets/images/email.png";
import passwordImg from "../../assets/images/password.png";
import google from "../../assets/images/google.png";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errSignup, setErrSignup] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUp = useAuthStore((state) => state.signUp);
  //const { signIn, signUp, signOut, user, loading } = useAuthStore();
  // поки не треба
  // const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async () => {
    const newErrors = {
      email: email.includes("@") ? "" : "Введіть коректний email",
      password:
        password.length >= 8 ? "" : "Пароль має бути не менше 8 символів",
      confirmPassword:
        password === confirmPassword ? "" : "Паролі не збігаються",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    try {
      await signUp(email, password);
      console.log("Успішна реєстрація:");
      router.push("/instructor/user-agreement"); // після успішного логіну
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
  };

  return (
    <View style={style("flex-1 bg-black relative")}>
      <View
        style={style(
          "w-full h-14 bg-[#000] z-10 absolute top-0 justify-center items-center"
        )}
      >
        <Text style={style("text-white text-base font-bold")}></Text>
      </View>

      <ScrollView
        contentContainerStyle={style("py-15 px-4")}
        showsVerticalScrollIndicator={false}
      >
        <View style={style("max-w-[320px] w-full mx-auto")}>
          <Text
            style={[
              style("text-white text-[18px] text-center mb-3 font-bold"),
              { fontFamily: "manrope" },
            ]}
          >
            Реєстрація
          </Text>
          <Text
            style={[
              style("text-[#C7C7C7] text-[16px] text-center mb-6 font-bold"),
              { fontFamily: "manrope" },
            ]}
          >
            Введіть свою електронну адресу та Пароль
          </Text>

          {/* Email */}
          <View style={style("mb-4")}>
            <View
              style={style(
                `flex-row items-center border-2 rounded-[12px] p-[10px] bg-[#646464]`,
                errors.email ? "border-red-500" : "border-[#BDBDBD]"
              )}
            >
              <Image
                source={emailImg}
                style={style("w-[24px] h-[24px] mr-2")}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Електронна адреса"
                placeholderTextColor="#fff"
                style={style(
                  `w-[82%] px-4 pl-1 py-1 text-white bg-[#646464]`,
                  errors.password ? "border-red-500" : "border-gray-500"
                )}
              />
            </View>
            {errSignup && (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errSignup}
              </Text>
            )}
            {errors.email ? (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errors.email}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm mt-1")}>
                Введіть вашу електронну адресу
              </Text>
            )}
          </View>

          {/* Password */}
          <View style={style("mb-4")}>
            <View
              style={style(
                `flex-row items-center border-2 rounded-[12px] px-[10px] bg-[#646464]`,
                errors.password ? "border-red-500" : "border-[#BDBDBD]"
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
                  `w-[82%] px-4 pl-1 py-4 text-white bg-[#646464]`,
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
            {errors.password ? (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errors.password}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm mt-1")}>
                Пароль має містити 8 символів
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={style("mb-6")}>
            <View
              style={style(
                `flex-row items-center border-2 rounded-[12px] px-[10px] bg-[#646464]`,
                errors.confirmPassword ? "border-red-500" : "border-[#BDBDBD]"
              )}
            >
              <Image
                source={passwordImg}
                style={style("w-[24px] h-[24px] mr-[5px]")}
              />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Підтвердьте пароль"
                underlineColorAndroid="transparent"
                placeholderTextColor="#fff"
                style={style(
                  `w-[82%] px-4 pl-1 py-4 text-white bg-[#646464]`,
                  errors.password ? "border-red-500" : "border-gray-500"
                )}
              />
              <Pressable
                onPress={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Octicons
                  name={showConfirmPassword ? "eye-closed" : "eye"}
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </View>
            {errors.confirmPassword ? (
              <Text style={style("text-red-500 text-sm mt-1")}>
                {errors.confirmPassword}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm mt-1")}>
                Пароль має містити 8 символів
              </Text>
            )}
          </View>

          {/* Register Button */}
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

        {/* <Text
          className="text-[#F89C3A] text-[18px] font-bold font-manrope "
          onPress={() => router.push("/instructor/register")}>
          Увійти
        </Text> */}

        {/* Social & Navigation */}
        <View style={style("mt-6 items-center")}>
          <Text
            style={[
              style("text-center text-[#C7C7C7] text-[16px] mb-5 font-bold"),
              { fontFamily: "ptsansnaBold" },
            ]}
          >
            Зареєструватись за допомогою
          </Text>
          <Image source={google} style={style("w-[44px] h-[44px] mb-6")} />
          <Text style={style("text-[#D7D7D7] text-[16px]")}>
            Вже є акаунт?{" "}
            <Text
              onPress={() => router.push("/instructor/signin")}
              style={[
                style("text-[#F89C3A] text-[18px] font-bold"),
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
