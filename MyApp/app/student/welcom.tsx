import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import tw from "twrnc";

export default function StudentScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={tw`flex-1 bg-black p-4 pt-14`}>
      
      

      <TextInput
        style={tw`bg-white rounded px-3 py-2 mb-4`}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}
