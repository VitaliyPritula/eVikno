import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function PDFViewer() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "../docs/Політика конфіденційності.pdf" }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
