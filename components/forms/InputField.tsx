import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
}: Props) => {
  return (
    <View className="mb-5">
      <Text className="text-[#C7C7C7] text-[16px] mb-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        className={`border-2 px-4 py-3 rounded-full text-white bg-[#646464] ${
          error ? "border-red-500" : "border-gray-500"
        }`}
      />
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default InputField;
