// import { FIRESTORE_DB } from "../firebaseConfig";
// import { collection, setDoc, doc } from "firebase/firestore";
// import serviceCenters from "../centers.json";
// export const seedServiceCenters = async () => {
//   try {
//     for (const center of serviceCenters) {
//       await setDoc(
//         doc(collection(FIRESTORE_DB, "service_centers"), center.id),
//         center
//       );
//     }
//     console.log("✅ Service centers seeded successfully");
//   } catch (error) {
//     console.error("❌ Error seeding service centers:", error);
//   }
// };

//to add it to database
// Usage example in a React Native component
// Uncomment the following code to use the seedServiceCenters function in a React Native component
// import React, { useState } from "react";
// import { View, Text, Button, ActivityIndicator } from "react-native";
// import { seedServiceCenters } from "../utils/seedServiceCenters"; // путь к твоей функции

// const SeedServiceCentersButton = () => {
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);
//   const [error, setError] = useState("");

//   const handleSeed = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await seedServiceCenters();
//       setDone(true);
//     } catch (e) {
//       setError("❌ Ошибка при загрузке сервис центров");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View className="items-center justify-center p-4">
//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : done ? (
//         <Text className="text-green-600 font-semibold mt-2">
//           ✅ Сервис центры добавлены
//         </Text>
//       ) : (
//         <Button title="Загрузить сервис центры" onPress={handleSeed} />
//       )}
//       {error ? <Text className="text-red-600 mt-2">{error}</Text> : null}
//     </View>
//   );
// };

// export default SeedServiceCentersButton;
