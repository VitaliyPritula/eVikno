import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { style } from "twrnc";

export default function StudentScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={style("flex-1 bg-black p-4 pt-14")}>
      
      

      <TextInput
        style={style("bg-white rounded px-3 py-2 mb-4")}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}
