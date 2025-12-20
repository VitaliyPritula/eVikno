// app/instructor/signin.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FirebaseError } from "firebase/app";

import { signInSchema } from "@/shemas/signSchema";
import InputField from "@/components/forms/InputFieldSign";
import { useAuthStore } from "@/store/authStore";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

import google from "../../assets/images/google.png";

type LoginFormData = z.infer<typeof signInSchema>;

export default function LoginScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  const [firebaseError, setFirebaseError] = useState("");

  const { user, signInWithGoogle, isLoading } = useGoogleAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Перехід після успішного Google login
  useEffect(() => {
    if (user) {
      router.push("/instructor/main");
    }
  }, [user]);

  // Email + password
  const onSubmit = async (data: LoginFormData) => {
    setFirebaseError("");
    try {
      await signIn(data.email, data.password);
      router.push("/instructor/main");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(
          error.code in SIGNIN_ERROR_MESSAGES
            ? SIGNIN_ERROR_MESSAGES[error.code]
            : "Сталася помилка. Спробуйте пізніше"
        );
      } else {
        setFirebaseError("Сталася помилка");
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black container">
      <ScrollView contentContainerStyle={{ paddingVertical: 32 }}>
        <View className="w-full mx-auto">
          <Text className="text-white text-sm text-center font-semibold mb-3">
            Увійти
          </Text>
          <Text className="text-textcolor text-center font-semibold mb-5">
            Введіть електронну адресу та пароль
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
                keyboardType="email-address"
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
                secureTextEntry
                icon="lock"
                error={errors.password?.message}
              />
            )}
          />

          {firebaseError && (
            <Text className="text-red-500 text-sm mt-2">{firebaseError}</Text>
          )}

          {/* Email submit */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-green w-full py-3 mt-10 rounded-xl"
          >
            <Text className="text-center text-black text-lg font-semibold">
              Увійти
            </Text>
          </Pressable>

          {/* Google login */}
          <View className="mt-10 items-center">
            <Text className="text-grey-text mb-5">Увійти за допомогою</Text>
            <TouchableOpacity
              onPress={signInWithGoogle}
              disabled={isLoading}
              className={isLoading ? "opacity-50" : ""}
            >
              <Image source={google} style={{ width: 44, height: 44 }} />
            </TouchableOpacity>

            {isLoading && (
              <Text className="text-white mt-4">Завантаження...</Text>
            )}

            <Text className="text-textakount mt-8">
              Немає акаунту?{" "}
              <Text
                onPress={() => router.push("/instructor/signup")}
                className="text-warning font-bold"
              >
                Зареєструватися
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
