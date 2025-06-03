import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ThemeProvider,
  DarkTheme,
  // DefaultTheme,
} from "@react-navigation/native";

import { useColorScheme } from "react-native";
import "../global.css";
export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    // Назва повинна збігатися з тією, що ти використовуєш у стилях
    ptsansnarrow: require("../assets/fonts/PT_Sans-Narrow-Regular.ttf"),
    ptsansnaBold: require("../assets/fonts/PT_Sans-Narrow-Bold.ttf"),
    marcellus: require("../assets/fonts/Marcellus-Regular.ttf"),
    manrope: require("../assets/fonts/manrope-semibold.otf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DarkTheme}>
      <StatusBar style="dark" backgroundColor="black" />
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
      <SafeAreaView className="flex-1 bg-black font-manrope">
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </ThemeProvider>
  );
}
