import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { useAuthStore } from "@/store/authStore";
import { SIGNIN_ERROR_MESSAGES } from "@/constants/firebaseErrors";
import { View, Text, Pressable, ScrollView, Image } from "react-native";

import InputField from "@/components/forms/InputFieldSign";
import google from "../../assets/images/google.png";

const schema = z.object({
  email: z.string().email("Введіть коректний email"),
  password: z.string().min(8, "Пароль повинен бути не менше 8 символів"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setFirebaseError("");
    try {
      await signIn(data.email, data.password);
      router.push("/instructor/main");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message =
          SIGNIN_ERROR_MESSAGES[error.code] ||
          "Сталася помилка. Спробуйте пізніше";
        setFirebaseError(message);
      } else {
        setFirebaseError("Сталася помилка");
        console.error(error);
      }
    }
  };

  return (
    <View className="flex-1 bg-black container">
      <ScrollView
        contentContainerStyle={{ paddingVertical: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full mx-auto ">
          <Text className="text-white font-manrope text-sm text-center font-semibold mb-3">
            Увійти
          </Text>
          <Text className="text-textcolor text-m text-center  font-semibold mb-5">
            Введіть електрону адресу та пароль
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                placeholder="Електронна адреса"
                icon="mail"
                error={errors.email?.message}
                // keyboardType="email-address"
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                placeholder="Пароль"
                secureTextEntry={!showPassword}
                icon="lock"
                toggleVisibility={() => setShowPassword((prev) => !prev)}
                showPasswordToggle
                error={errors.password?.message}
              />
            )}
          />

          {firebaseError !== "" && (
            <Text className="text-red-500 text-sm mt-1">{firebaseError}</Text>
          )}

          {/* Submit */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-green w-full py-3 mt-16 mb-8 rounded-xl"
          >
            <Text className="text-center text-black text-lg font-semibold font-manrope">
              Увійти
            </Text>
          </Pressable>

          {/* Divider & Google */}
          <View className="mt-6 items-center">
            <Text className="text-center text-grey-text text-m mb-5 font-regular font-manrope">
              Увійти за допомогою
            </Text>
            <Image source={google} style={{ width: 44, height: 44 }} />
            <Text className="text-textakount text-m mt-8 font-manrope">
              Немає акаунту?{" "}
              <Text
                onPress={() => router.push("/instructor/signup")}
                className="text-warning text-m font-bold font-manrope"
              >
                Зареєструватися
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
