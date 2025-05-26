// app/instructor/pdf-viewer.tsx
import React, { useEffect } from "react";
import { View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as WebBrowser from "expo-web-browser";
import { Asset } from "expo-asset";
import { useLocalSearchParams } from "expo-router";

export default function PDFViewer() {
  const { file } = useLocalSearchParams();

  useEffect(() => {
    const openLocalPDF = async () => {
      try {
        let asset;
        if (file === "privacy") {
          asset = Asset.fromModule(require("../../assets/docs/Політика конфіденційності.pdf"));
        } else if (file === "terms") {
          asset = Asset.fromModule(require("../../assets/docs/Правила користування сайтом.pdf"));
        } else {
          console.warn("Невідомий файл PDF");
          return;
        }

        await asset.downloadAsync();
        const localUri = `${FileSystem.cacheDirectory}${file}.pdf`;

        await FileSystem.copyAsync({
          from: asset.localUri!,
          to: localUri,
        });

        await WebBrowser.openBrowserAsync(localUri);
      } catch (err) {
        console.error("Помилка при відкритті PDF:", err);
      }
    };

    openLocalPDF();
  }, [file]);

  return <View style={{ flex: 1, backgroundColor: "#000" }} />;
}
