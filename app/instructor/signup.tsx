import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import tw, { style } from "twrnc";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  // поки не треба
  // const [rememberMe, setRememberMe] = useState(false);

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
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Успішна реэстрація:", response.user);
      //router.push("/"); // після успішного логіну
    } catch (error) {
      console.error("Error:", error);
    }

    // const hasError = Object.values(newErrors).some((e) => e !== "");
    // if (hasError) return;

    // console.log("Логін:", { email, password, rememberMe });
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <ScrollView
        contentContainerStyle={tw`pb-15 px-4 pt-6`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`max-w-[320px] w-full mx-auto`}>
          <Text
            style={[
              tw`text-white text-[18px] text-center leading-[22px] mb-6 font-bold`,
              { fontFamily: "manrope" },
            ]}
          >
            Зареєструватись як інструктор
          </Text>

          {/* Email */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#C7C7C7] mb-1`}>Email або логін</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="example@mail.com"
              placeholderTextColor="#646464"
              style={style(
                `border-2 rounded-[23px] px-4 py-3 text-white bg-[#646464]`,
                errors.email ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.email ? (
              <Text style={tw`text-red-500 text-sm mt-1`}>{errors.email}</Text>
            ) : (
              <Text style={tw`text-[#D7D7D7] text-sm mt-1`}>
                Введіть ваш email або логін
              </Text>
            )}
          </View>

          {/* Password */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-[#C7C7C7] mb-1`}>Пароль</Text>
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
              <Text style={tw`text-red-500 text-sm mt-1`}>
                {errors.password}
              </Text>
            ) : (
              <Text style={tw`text-[#D7D7D7] text-sm mt-1`}>
                Мінімум 6 символів
              </Text>
            )}
          </View>

          <Pressable
            onPress={handleLogin}
            style={tw`bg-[#8BD73D] w-full py-3 rounded-xl`}
          >
            <Text
              style={[
                tw`text-center text-black text-lg font-bold`,
                { fontFamily: "ptsansnaBold" },
              ]}
            >
              Зареєструватись
            </Text>
          </Pressable>
        </View>
        <View style={tw`mt-6 items-center`}>
          <Text style={tw`text-[#D7D7D7] text-sm`}>
            Вже э аккаунт?{" "}
            <Text
              onPress={() => router.push("/instructor/signin")}
              style={tw`text-[#8BD73D]`}
            >
              Увійти
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
