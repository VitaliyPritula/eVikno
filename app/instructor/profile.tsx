import React from "react";
import { router } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/forms/InputFieldProfile";
import { useAuthStore } from "@/store/authStore";

const Profile = () => {
  const instructorProfile = useAuthStore((state) => state.profile);
  const signOut = useAuthStore((state) => state.signOut);

  const deleteAccount = useAuthStore((state) => state.deleteAccount);

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

  const handleSubmit = () => {};
  return (
    <View className="flex-1 bg-black container py-8">
      <Pressable
        onPress={handleLogout}
        className="bg-green w-full py-3 mt-16 mb-8 rounded-xl"
      >
        <Text className="text-center text-black text-lg font-semibold font-manrope">
          LOGOUT
        </Text>
      </Pressable>
      <Pressable
        onPress={handleDeleteAccount}
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
