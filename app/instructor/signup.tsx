import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { FirebaseError } from "firebase/app";
import { SIGNUP_ERROR_MESSAGES } from "@/constants/firebaseErrors";
import InputField from "@/components/forms/InputFieldSign";
import google from "../../assets/images/google.png";

const schema = z
  .object({
    email: z.string().email("Введіть коректний email"),
    password: z.string().min(8, "Пароль має бути не менше 8 символів"),
    confirmPassword: z.string().min(8, "Підтвердження пароля обов'язкове"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Паролі не збігаються",
  });

type FormData = z.infer<typeof schema>;

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errSignup, setErrSignup] = useState("");

  const signUp = useAuthStore((state) => state.signUp);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data.email, data.password);
      router.push("/instructor/user-agreement");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg =
          SIGNUP_ERROR_MESSAGES[error.code] ||
          "Сталася помилка. Спробуйте пізніше";
        setErrSignup(errorMsg);
        console.error("SignUp Error:", error);
      } else {
        setErrSignup("Невідома помилка. Спробуйте ще раз.");
        console.error("Невідома помилка:", error);
      }
    }
  };

  return (
    <View className="flex-1 bg-black container ">
      <ScrollView
        // contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 32 }}
      >
        <View className=" w-full mx-auto">
          <Text className="text-white text-[18px] text-center mb-3 font-bold font-manrope">
            Реєстрація
          </Text>
          <Text className="text-[#C7C7C7] text-[16px] text-center mb-6 font-bold font-manrope">
            Введіть свою електронну адресу та пароль
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                placeholder="Електронна адреса"
                icon="mail"
                error={errors.email?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                placeholder="Пароль"
                icon="lock"
                secureTextEntry={!showPassword}
                toggleVisibility={() => setShowPassword((prev) => !prev)}
                showPasswordToggle
                error={errors.password?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                placeholder="Підтвердьте пароль"
                icon="lock"
                secureTextEntry={!showConfirmPassword}
                toggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
                showPasswordToggle
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {errSignup && (
            <Text className="text-red-500 text-sm mb-4">{errSignup}</Text>
          )}

          {/* Submit */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-[#8BD73D] w-full py-3 rounded-xl"
          >
            <Text className="text-center text-black text-lg font-bold font-ptsansnaBold">
              Зареєструватись
            </Text>
          </Pressable>

          {/* Divider & Google */}
          <View className="mt-6 items-center">
            <Text className="text-center text-[#C7C7C7] text-[16px] mb-5 font-bold font-ptsansnaBold">
              Зареєструватись за допомогою
            </Text>
            <Image source={google} style={{ width: 44, height: 44 }} />
            <Text className="text-[#D7D7D7] text-[16px] mt-6">
              Вже є акаунт?{" "}
              <Text
                onPress={() => router.push("/instructor/signin")}
                className="text-[#F89C3A] text-[18px] font-bold font-manrope"
              >
                Увійти
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
