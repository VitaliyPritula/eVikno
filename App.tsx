import { View, Text } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-blue-500 font-bold text-xl">
        Привіт, Tailwind + React Native!
      </Text>
    </View>
  );
}
