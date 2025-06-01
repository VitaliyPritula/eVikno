import React from "react";
import { router } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/forms/InputFieldProfile";
import { useAuthStore } from "@/store/authStore";

const Profile = () => {
  const handleSubmit = () => {};
  return (
    <View className="flex-1 bg-black container py-8">
      <Pressable
        onPress={handleSubmit}
        className="bg-green w-full py-3 mt-16 mb-8 rounded-xl"
      >
        <Text className="text-center text-black text-lg font-semibold font-manrope">
          LOGOUT
        </Text>
      </Pressable>
      <Pressable
        onPress={handleSubmit}
        className="bg-warning w-full py-3 mt-16 mb-8 rounded-xl"
      >
        <Text className="text-center text-black text-lg font-semibold font-manrope">
          DELETE ACCOUNT
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;
