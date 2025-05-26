import React, { useEffect } from "react";
import { View, Alert, Linking, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PDFViewer() {
  const { file } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const openLocalPDF = async () => {
      try {
        let asset;

        if (file === "privacy") {
          asset = Asset.fromModule(require("../../assets/docs/Політика конфіденційності.pdf"));
        } else if (file === "terms") {
          asset = Asset.fromModule(require("../../assets/docs/Правила користування сайтом.pdf"));
        } else {
          Alert.alert("Помилка", "Невідомий файл PDF");
          router.back();
          return;
        }

        await asset.downloadAsync();
        const localUri = asset.localUri ?? asset.uri;

        if (!localUri) {
          Alert.alert("Помилка", "Не вдалося завантажити файл");
          router.back();
          return;
        }

        // Відкрити файл у зовнішньому додатку
        const supported = await Linking.canOpenURL(localUri);
        if (supported) {
          await Linking.openURL(localUri);
        } else {
          Alert.alert("Помилка", "Неможливо відкрити цей файл");
        }
        router.back(); // Повернутися назад після відкриття
      } catch (error) {
        Alert.alert("Помилка", "Не вдалося відкрити PDF файл");
        router.back();
      }
    };

    openLocalPDF();
  }, [file]);

  return <View style={{ flex: 1, backgroundColor: "#000" }} />;
}
