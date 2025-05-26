import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import tw from "twrnc";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Помилка", "Заповніть усі поля");
      return;
    }

    console.log("Зареєстровано:", { name, email, password });
    router.push("/");
  };

  return (
    <View style={tw`flex-1 bg-black justify-center max-w-[320px] mx-auto items-center px-6`}>
      <Text style={tw`text-white text-2xl mb-6 font-bold`}>Створіть профіль інструктора</Text>

      <TextInput
        placeholder="Ім’я"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
        style={tw`w-full mb-4 border border-gray-500 rounded px-4 py-3 text-white`}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={tw`w-full mb-4 border border-gray-500 rounded px-4 py-3 text-white`}
      />
      <TextInput
        placeholder="Пароль"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={tw`w-full mb-6 border border-gray-500 rounded px-4 py-3 text-white`}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={tw`bg-[#8BD73D] w-full py-3 rounded-xl`}>
        <Text style={tw`text-center text-black text-lg font-bold`}>
          Зареєструватись
        </Text>
      </TouchableOpacity>
    </View>
  );
}
