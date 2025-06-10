import React from "react";
import { router } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/forms/InputFieldProfile";
import { useAuthStore } from "@/store/authStore";
import { profileSchema } from "@/shemas/profileSchema"; // Assuming you have a schema for profile validation
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const instructorProfile = useAuthStore((state) => state.profile);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const signOut = useAuthStore((state) => state.signOut);

  const deleteAccount = useAuthStore((state) => state.deleteAccount);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: instructorProfile ? instructorProfile?.name : "",
      city: instructorProfile ? instructorProfile?.city : "",
      phone: instructorProfile ? instructorProfile?.phone : "",
      experience: instructorProfile ? instructorProfile?.experience : "",
      certificate: instructorProfile ? instructorProfile?.certificate : "",
      carModel: instructorProfile ? instructorProfile?.carModel : "",
      carNumber: instructorProfile ? instructorProfile?.carNumber : "",
      transmission: instructorProfile
        ? instructorProfile?.transmission
        : "mechanic", // Default value for transmission
    },
  });

  const handleLogout = async () => {
    try {
      signOut();
      //change it to do nice
      alert("You have been logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      deleteAccount();
      //change it to do nice
      alert("You have been deleted successfully.");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile({ ...data, isFree: false, serviceCenterId: "" });
      router.push("/instructor/main");
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black container ">
      <View className="flex-row items-center justify-between py-4">
        <Pressable
          //onPress={() => router.push("/instructor/main")}
          onPress={() => router.back()}
          className="bg-warning h-8 w-40 mb-8 rounded-xl flex justify-center items-center "
        >
          <Text className="text-center text-black text-lg font-semibold font-manrope">
            Назад
          </Text>
        </Pressable>
        <Pressable
          onPress={handleLogout}
          className="bg-warning h-8 w-40 mb-8 rounded-xl flex justify-center items-center "
        >
          <Text className="text-center text-black text-lg font-semibold font-manrope">
            Вихід
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingVertical: 32 }}
      >
        <View className=" w-full mx-auto pt-8">
          <Text className="text-white text-sm text-center font-semibold mb-3">
            Ваш профіль інструктора
          </Text>

          <Text className="text-grey-text text-m mb-8">
            Якщо бажаєте, ви можете змінити дані профілю.
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
                changable
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
                changable
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
                changable
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
                changable
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
                placeholder="FB123456"
                error={errors.certificate?.message}
                changable
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
                changable
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
                changable
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
                <View className="flex-row gap-4 justify-start">
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
        </View>

        <Pressable
          onPress={handleDeleteAccount}
          className="bg-warning w-full py-3 mt-16 mb-8 rounded-xl"
        >
          <Text className="text-center text-black text-lg font-semibold font-manrope">
            Видалити аккаунт
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
