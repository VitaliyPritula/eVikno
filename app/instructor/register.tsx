import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    <View
      style={tw`flex-1 bg-black justify-center max-w-[320px] w-full mx-auto items-center px-[10px]`}>
      <Text
        style={[
          tw`text-white text-[18px] text-center leading-[22px] mb-3 font-bold`,
          { fontFamily: "manrope" },
        ]}>
        Створіть профіль інструктора
      </Text>
      <Text
        style={tw`text-[#c7c7c7] text-[15px] mb-6 font-bold tracking-[-0.32px] mb-8`}>
        Щоб почати приймати учнів, заповни коротку форму. {"\n"} Це займе до 5
        хвилин.
      </Text>

      <View style={tw`w-full`}>
        <Text style={tw`text-white text-left mb-4 self-start font-semibold`}>
          1.Персональні дані
        </Text>
        <Text style={tw`text-white text-left mb-1 self-start font-semibold`}>
          Ім’я
        </Text>
        <TextInput
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
          style={tw`w-full mb-4 border border-gray-500 bg-grey rounded px-4 py-3 text-white`}
        />
      </View>
      <View style={tw`w-full`}>
        <Text style={tw`text-white mb-1 self-start font-semibold`}>Email</Text>
        <TextInput
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={tw`w-full mb-4 border border-gray-500 rounded px-4 py-3 text-white`}
        />
      </View>
      <View style={tw`w-full`}>
        <Text style={tw`text-white mb-1 self-start font-semibold`}>Пароль</Text>
        <TextInput
          placeholder="Пароль"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tw`w-full mb-6 border border-gray-500 rounded px-4 py-3 text-white`}
        />
      </View>

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
