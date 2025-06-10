import React from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: "mail" | "person" | "lock";
  error?: string;
  secureTextEntry?: boolean;
  toggleVisibility?: () => void;
  showPasswordToggle?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export default function InputField({
  value,
  onChangeText,
  placeholder,
  icon = "mail",
  error,
  secureTextEntry = false,
  toggleVisibility,
  showPasswordToggle = false,
  keyboardType = "default",
}: InputFieldProps) {
  const renderIcon = () => {
    switch (icon) {
      case "mail":
        return <MaterialIcons name="email" size={22} color="#D7D7D7" />;
      case "person":
        return <MaterialIcons name="person" size={22} color="#D7D7D7" />;
      case "lock":
        return <MaterialIcons name="lock" size={22} color="#D7D7D7" />;
      default:
        return null;
    }
  };

  return (
    <View className="mb-4">
      <View
        className={`flex-row items-center px-3 py-2 border-2 rounded-xl bg-grey font-manrope ${
          error ? "border-red-500" : "border-stroke"
        }`}
      >
        {/* Иконка слева */}
        <View className="mr-2">{renderIcon()}</View>

        {/* Поле ввода placeholder:text-placeholder*/}
        <TextInput
          className="flex-1 text-white text-s"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#d7d7d7"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />

        {/* Переключатель для пароля */}
        {showPasswordToggle && toggleVisibility && (
          <Pressable onPress={toggleVisibility}>
            <Octicons
              name={secureTextEntry ? "eye-closed" : "eye"}
              size={22}
              color="#fff"
            />
          </Pressable>
        )}
      </View>

      {/* Сообщение об ошибке */}
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
