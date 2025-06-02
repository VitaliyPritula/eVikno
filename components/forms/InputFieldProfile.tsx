import React from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  changable?: boolean; // Додано для можливості редагування
};

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
  changable = false, // Додано для можливості редагування
}: Props) => {
  return (
    <View className="mb-5">
      <Text className="text-[#C7C7C7] text-[16px] mb-1">{label}</Text>
      <View
        className={`flex-row border-2 px-4 py-3 rounded-full text-white bg-[#646464] ${
          error ? "border-red-500" : "border-gray-500"
        } `}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          className="flex-1 text-white text-s"
        />
        {/* Переключатель для пароля onPress={toggleVisibility}*/}
        {changable && (
          <Pressable>
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          </Pressable>
        )}
      </View>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default InputField;
