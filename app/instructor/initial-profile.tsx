import React from "react";
import { router } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/forms/InputField";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  name: z.string().min(5, "Введіть ім’я"),
  city: z.string().min(1, "Вкажіть місто"),
  phone: z
    .string()
    .min(10, "Вкажи номер в форматі +38 000 000 00 00")
    .regex(/^\+38\d{10}$/, "Формат номера некоректний"),
  experience: z.string().min(1, "Вкажіть досвід роботи"),
  certificate: z
    .string()
    .min(8, "Вкажіть номер атестата")
    .regex(
      /^[A-Z]{2}\d{6}$/,
      "Формат атестата: дві великі латинські літери та 6 цифр (наприклад, AA123456)"
    ),
  carModel: z.string().min(3, "Вкажіть модель авто"),
  carNumber: z.string().min(3, "Вкажіть номер авто"),
  transmission: z.enum(["mechanic", "automatic"], {
    required_error: "Оберіть тип трансмісії",
  }),
});
type FormData = z.infer<typeof schema>;

export default function InitialProfile() {
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      city: "",
      phone: "",
      experience: "",
      certificate: "",
      carModel: "",
      carNumber: "",
      transmission: "mechanic",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile({ ...data, isFree: false, serviceCenter: "" });
      router.push("/instructor/main");
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  return (
    <View className="flex-1 container">
      <ScrollView contentContainerClassName="pb-20 ">
        <View className=" w-full mx-auto pt-8">
          <Text className="text-white text-sm text-center font-semibold mb-3">
            Створіть профіль інструктора
          </Text>

          <Text className="text-grey-text text-m mb-8">
            Щоб почати приймати учнів, заповни коротку форму. {"\n"} Це займе до
            5 хвилин.
          </Text>

          {/* Поля */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Ім’я та Прізвище"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
                placeholder="Іван Пінчук"
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Місто"
                value={value}
                onChangeText={onChange}
                error={errors.city?.message}
                placeholder="Київ"
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Номер телефону"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                error={errors.phone?.message}
                placeholder="+38 000 000 00 00"
              />
            )}
          />

          <Controller
            control={control}
            name="experience"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Досвід роботи"
                value={value}
                onChangeText={onChange}
                placeholder="4 роки"
                error={errors.experience?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="certificate"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Атестат інструктора"
                value={value}
                onChangeText={onChange}
                placeholder="AB123456"
                error={errors.certificate?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="carModel"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Марка та модель авто"
                value={value}
                onChangeText={onChange}
                placeholder="Skoda Octavia"
                error={errors.carModel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="carNumber"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Державний знак"
                value={value}
                onChangeText={onChange}
                placeholder="AA1234BB"
                error={errors.carNumber?.message}
              />
            )}
          />

          {/* Перемикач трансмісії */}
          <Controller
            control={control}
            name="transmission"
            render={({ field: { value, onChange } }) => (
              <View className="mt-4">
                <Text className="text-[#C7C7C7] text-[16px] mb-2">
                  Тип трансмісії
                </Text>
                <View className="flex-row gap-4">
                  <Pressable
                    onPress={() => onChange("mechanic")}
                    className={`px-4 py-2 rounded-full border ${
                      value === "mechanic" ? "bg-white" : "border-white"
                    }`}
                  >
                    <Text
                      className={`${
                        value === "mechanic" ? "text-black" : "text-white"
                      }`}
                    >
                      Механіка
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => onChange("automatic")}
                    className={`px-4 py-2 rounded-full border ${
                      value === "automatic" ? "bg-white" : "border-white"
                    }`}
                  >
                    <Text
                      className={`${
                        value === "automatic" ? "text-black" : "text-white"
                      }`}
                    >
                      Автомат
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          {/* Кнопка */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="mt-8 bg-green rounded-full  items-center justify-center h-12"
          >
            <Text className="text-black font-semibold text-m">
              Зберегти данні
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/instructor/main")}
            className="mt-8 h-12 bg-black border-2  rounded-full border-secondary items-center justify-center"
          >
            <Text className="text-secondary font-semibold  text-m">
              Заповнити пізніше
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
