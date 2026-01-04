import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";

type Instructor = {
  name: string;
  price: string;
  phone: string;
  carModel: string;
  carNumber: string;
  transmission: string;
  licensePlate: string;
  experience: string;
  certificate: string;
  city: string;
  rating?: number; // рейтинг інструктора
};

const makeCall = (phone: string) => {
  Linking.openURL(`tel:${phone}`);
};

export default function InstructorDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number>(0); // локальна оцінка
  const [savingRating, setSavingRating] = useState(false);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchInstructor = async () => {
        try {
          const docRef = doc(FIRESTORE_DB, "instructors", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as Instructor;
            setInstructor(data);
            if (data.rating) setUserRating(data.rating); // встановлюємо поточний рейтинг
          } else {
            setInstructor(null);
          }
        } catch (error) {
          console.error("Помилка при завантаженні інструктора:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchInstructor();
    }
  }, [id]);

  const handleRate = async (rating: number) => {
    setUserRating(rating);
    if (!id) return;
    setSavingRating(true);
    try {
      const docRef = doc(FIRESTORE_DB, "instructors", id);
      await updateDoc(docRef, { rating }); // записуємо рейтинг у Firestore
    } catch (e) {
      console.error("Помилка при збереженні рейтингу:", e);
    } finally {
      setSavingRating(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!instructor) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-4">
        <Text className="text-white text-xl font-bold">
          Інструктор не знайдений
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 flex-row items-center bg-gray-700 px-4 py-2 rounded"
        >
          <Text className="text-white">Назад</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 py-20 mx-auto bg-black px-1">
      <Pressable
        onPress={() => router.back()}
        className="self-start mb-11 flex-row items-center px-4 py-2 rounded"
      >
        <Icon
          name="chevron-forward"
          size={28}
          color="#fff"
          className=" transform rotate-180"
        />
        <Text className="text-white font-manrope font-regular text-m">
          Назад
        </Text>
      </Pressable>

      {/* Інформація про інструктора */}
      <View className="bg-grey border-2 w-[320px] border-white rounded-xl px-[8px] py-[12px] mb-8">
        <Text className="text-white text-sm font-semibold font-manrope mb-4">
          {instructor.name}
        </Text>

        <View className="flex-row items-center mb-4">
          <Text className="text-white mr-2">Рейтинг:</Text>
          {Array.from({ length: 5 }).map((_, i) => (
            <TouchableOpacity key={i} onPress={() => handleRate(i + 1)}>
              <Text
                className={i < userRating ? "text-yellow-400" : "text-gray-500"}
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
          <Text className="text-white ml-2">{userRating.toFixed(1)}</Text>
        </View>

        <View className="flex-row justify-between mb-5">
          <Text className="text-textcolor mb-2 font-manrope">Ціна</Text>
          <Text className="text-white mb-2 font-manrope text-m tracking-[-0.32px]">
            {instructor.price ?? "500 грн"}
          </Text>
        </View>

        <View className="flex-row justify-between items-center gap-x-2">
          <Entypo
            name="phone"
            size={24}
            color="#C7C7C7"
            className="transform rotate-90"
          />
          <Text className="text-white mb-2 text-m tracking-[-0.32px] font-manrope">
            {instructor.phone}
          </Text>
        </View>
      </View>

      {/* Інші блоки про авто, досвід, атестат можна залишити без змін */}

      <TouchableOpacity
        onPress={() => makeCall(instructor.phone)}
        className="bg-green mt-6 px-6 py-3 rounded-3xl"
      >
        <Text className="text-btn text-sm font-ptsansnaBold text-center text-base">
          Зателефонувати
        </Text>
      </TouchableOpacity>
    </View>
  );
}
