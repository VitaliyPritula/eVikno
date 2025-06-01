import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function UserAgreement() {
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [showError, setShowError] = useState(false);

  const canContinue = agreeConsent && agreePrivacy;

  const onNext = () => {
    if (!canContinue) {
      console.log("in Next");
      setShowError(true);
      return;
    }

    router.push("/instructor/initial-profile");
  };
  return (
    <View className="flex-1 container  py-8 bg-black  justify-center ">
      <Text className="text-grey-text  font-medium text-m  font-manrope mb-16">
        Будь ласка, підтвердьте свою згоду з умовами користування платформою та
        обробкою персональних даних.
      </Text>
      <View className="mb-12">
        <Pressable
          onPress={() => setAgreeConsent(!agreeConsent)}
          className="flex-row items-center mb-4"
        >
          <View
            className={`w-5 h-5 rounded-full border mr-8 items-center justify-center
              ${agreeConsent && "border-white bg-white"}
              ${!showError && !agreeConsent && "border-white"}
              ${showError && !agreeConsent ? "border-red-500" : ""}`}
          >
            {agreeConsent && <Text className="text-black text-xs">✓</Text>}
          </View>
          <Text className="text-white text-s  font-manrope">
            Я погоджуюсь з умовами користування платформою
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setAgreePrivacy(!agreePrivacy)}
          className="flex-row items-center "
        >
          <View
            className={`w-5 h-5 rounded-full border mr-8 items-center justify-center
              ${agreePrivacy && "border-white bg-white"}
              ${!showError && !agreePrivacy && "border-white"}
              ${showError && !agreePrivacy ? "border-red-500" : ""}
              `}
          >
            {agreePrivacy && <Text className="text-black text-xs">✓</Text>}
          </View>
          <Text className="text-white text-s  font-manrope">
            Даю згоду на обробку персональних даних
          </Text>
        </Pressable>
      </View>

      <View className="mb-12">
        <Text className="text-grey-text text-base font-medium mb-4 font-manrope">
          Далі — коротка форма для заповнення профілю. Це займе лише пару
          хвилин.
        </Text>
        <Text className="text-grey-text text-base font-medium  font-manrope">
          Якщо зараз немає часу — не хвилюйтеся, ви зможете повернутись до неї
          пізніше. Але памʼятайте: заповнення профілю є обов’язковим для
          використання застосунку.
        </Text>
      </View>

      <Pressable
        onPress={onNext}
        // disabled={!canContinue}
        className={` py-3 rounded-xl items-center
          ${canContinue ? "bg-green" : "bg-black border-secondary border-2"}`}
      >
        <Text
          className={`text-m font-semibold
            ${canContinue ? "text-black" : "text-secondary"} font-manrope`}
        >
          Далі
        </Text>
      </Pressable>
    </View>
  );
}
