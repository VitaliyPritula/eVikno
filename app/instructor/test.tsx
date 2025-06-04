import React from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Test = () => {
  //  const selectedCenter = "8041"; // Example selected center
  const DATA = [
    "Center 1",
    "Center 2",
    "Center 3",
    "Center 4",
    "Center 5",
    "Center 6",
    "Center 7",
    "Center 8",
    "Center 9",
    "Center 10",
  ];
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};

export default Test;
