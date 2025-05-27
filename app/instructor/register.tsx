import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, Pressable, View } from "react-native";
import tw from "twrnc";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [certificate, setCertificate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPlate, setCarPlate] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    city: "",
    phone: "",
  });

  const handleRegister = () => {
    const newErrors = {
      name: name ? "" : "Введіть ім’я",
      city: city ? "" : "Вкажіть місто",
      phone:
        phone.length >= 10 ? "" : "Вкажи номер в форматі +38 000 000 00 00",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    console.log("Зареєстровано:", {
      name,
      city,
      phone,
      experience,
      certificate,
      carModel,
      carPlate,
      transmission,
    });

    router.push("/");
  };

  const [transmission, setTransmission] = useState<"mechanic" | "auto" | null>(
    null
  );

  const [agreeConsent, setAgreeConsent] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [agreeConsent1, setAgreeConsent1] = useState(true);
  const [agreePrivacy1, setAgreePrivacy1] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!agreeConsent || !agreePrivacy) {
      setShowError(true);
      return;
    }

    // Продовжити логіку (навігація або сабміт)
  };
   const handleSubmitlOG = () => {
    router.push("/instructor/login"); // ⬅️ Переходить на сторінку реєстрації
  };

  return (
    <View style={tw`flex-1`}>
      {/* Хедер */}
      <View style={tw`w-full h-14 bg-black justify-center items-center`}>
        <Text style={tw`text-white text-base font-bold`}></Text>
      </View>

      <ScrollView
        contentContainerStyle={tw`pb-15 px-[15px]`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`max-w-[320px] w-full mx-auto pt-6`}>
          <Text
            style={[
              tw`text-white text-[18px] text-center leading-[22px] mb-3 font-bold`,
              { fontFamily: "manrope" },
            ]}>
            Створіть профіль інструктора
          </Text>

          <Text
            style={[
              tw`text-[#C7C7C7] text-[16px] leading-[22px] font-regular tracking-[-0.32px] mb-8`,
              { fontFamily: "manrope" },
            ]}>
            Щоб почати приймати учнів, заповни коротку форму. {"\n"} Це займе до
            5 хвилин.
          </Text>

          {/* Ім’я */}
          <View style={tw`w-full mb-3`}>
            <Text
              style={[
                tw`text-[#FDFDFD] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular`,
                { fontFamily: "manrope" },
              ]}>
              1.Персональні дані
            </Text>
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] mb-1`}>
              Ім’я та Прізвище <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              // placeholderTextColor="#646464"
              value={name}
              onChangeText={setName}
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.name ? (
              <Text style={tw`text-red-500 text-sm pl-1 mt-1`}>
                {errors.name}
              </Text>
            ) : (
              <Text style={tw`text-[#D7D7D7] text-sm pl-1 mt-1`}>
                Наприклад: Іван Пінчук
              </Text>
            )}
          </View>

          {/* Місто */}
          <View style={tw`w-full mb-3`}>
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] mb-1`}>
              Місто <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={city}
              onChangeText={setCity}
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.city ? (
              <Text style={tw`text-red-500 text-sm pl-1 mt-1`}>
                {errors.city}
              </Text>
            ) : (
              <Text style={tw`text-[#D7D7D7] text-sm pl-1 mt-1`}>
                Вкажи місто, в якому працюєш
              </Text>
            )}
          </View>

          {/* Телефон */}
          <Text
            style={[
              tw`text-[#C7C7C7] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular`,
              { fontFamily: "manrope" },
            ]}>
            2.Контакти
          </Text>
          <View style={tw`w-full mb-6`}>
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] mb-1`}>
              Номер телефону <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.phone ? (
              <Text
                style={tw`text-red-500 text-[12px] pl-1 mt-1 tracking-[-0.70px]`}>
                {errors.phone}
              </Text>
            ) : (
              <Text
                style={tw`text-[#D7D7D7] text-[12px] tracking-[-0.70px] pl-1 mt-1`}>
                Вкажи номер у форматі +38 000 000 00 00
              </Text>
            )}
          </View>

          {/* Досвід */}
          <View style={tw`w-full mb-5`}>
            <Text
              style={[
                tw`text-[#C7C7C7] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular`,
                { fontFamily: "manrope" },
              ]}>
              3.Досвід
            </Text>
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] mb-1`}>
              Досвід роботи <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={experience}
              onChangeText={setExperience}
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            <Text style={tw`text-[#D7D7D7] text-sm pl-1 mt-1 mb-3`}>
              Вказати в роках. Наприклад 4 роки
            </Text>

            {/* Атестат */}
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] mb-1`}>
              Атестат інструктора <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={certificate}
              onChangeText={setCertificate}
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
          </View>

          {/* Автомобіль */}
          <View style={tw`w-full mb-5`}>
            <Text
              style={[
                tw`text-[#C7C7C7] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular`,
                { fontFamily: "manrope" },
              ]}>
              4.Автомобіль
            </Text>
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] mb-1`}>
              Марка та модель авто <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={carModel}
              onChangeText={setCarModel}
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            <Text style={tw`text-[#D7D7D7] text-sm pl-1 mt-1`}>
              Наприклад: Skoda Octavia
            </Text>

            <Text style={tw`text-[#C7C7C7] text-left text-[16px] pt-3 mb-3`}>
              Державний знак <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={carPlate}
              onChangeText={setCarPlate}
              style={tw.style(
                `border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white`,
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />

            {/* Трансмісія */}
            <Text style={tw`text-[#C7C7C7] text-left text-[16px] pt-3 mb-3`}>
              Тип трансмісії <Text style={tw`text-red-500`}>*</Text>
            </Text>
            <Pressable
              onPress={() => setTransmission("mechanic")}
              style={tw`flex-row items-center mb-4`}>
              <View
                style={tw.style(
                  "w-5 h-5 rounded-full border border-white mr-2 items-center justify-center",
                  transmission === "mechanic" && "bg-white"
                )}>
                {transmission === "mechanic" && (
                  <View style={tw`w-2 h-2 rounded-full bg-black`} />
                )}
              </View>
              <Text
                style={[tw`text-white text-[16px]`, { fontFamily: "manrope" }]}>
                Механіка
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setTransmission("auto")}
              style={tw`flex-row items-center`}>
              <View
                style={tw.style(
                  "w-5 h-5 rounded-full border border-white mr-2 items-center justify-center",
                  transmission === "auto" && "bg-white"
                )}>
                {transmission === "auto" && (
                  <View style={tw`w-2 h-2 rounded-full bg-black`} />
                )}
              </View>
              <Text
                style={[tw`text-white text-[16px]`, { fontFamily: "manrope" }]}>
                Автомат
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleRegister}
            style={tw`bg-[#8BD73D] w-full py-3 rounded-xl mb-4`}>
            <Text
              style={[
                tw`text-center text-black text-lg font-bold`,
                { fontFamily: "ptsansnaBold" },
              ]}>
              Зареєструватись
            </Text>
          </Pressable>
          <Pressable
            onPress={handleSubmitlOG}
            style={tw`bg-[#8BD73D] w-full py-3 rounded-xl mb-4`}>
            <Text
              style={[
                tw`text-center text-black text-lg font-bold`,
                { fontFamily: "ptsansnaBold" },
              ]}>
              Увійти
            </Text>
          </Pressable>

          {/* Чекбокси */}
          <View>
            <Pressable
              onPress={() => setAgreeConsent(!agreeConsent)}
              style={tw`flex-row items-center mb-4`}>
              <View
                style={tw.style(
                  "w-5 h-5 rounded-full border mr-2 items-center justify-center",
                  agreeConsent ? "border-white bg-white" : "border-white",
                  showError && !agreeConsent && "border-red-500"
                )}>
                {agreeConsent && <Text style={tw`text-black text-xs`}>✓</Text>}
              </View>

              <Text
                style={[
                  tw`text-white text-[16px] tracking-[-0.32px]`,
                  { fontFamily: "manrope" },
                ]}>
                Я погоджуюсь з умовами користування платформою
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setAgreePrivacy(!agreePrivacy)}
              style={tw`flex-row items-center`}>
              <View
                style={tw.style(
                  "w-5 h-5 rounded-full border mr-2 items-center justify-center",
                  agreePrivacy ? "border-white bg-white" : "border-white",
                  showError && !agreePrivacy && "border-red-500"
                )}>
                {agreePrivacy && <Text style={tw`text-black text-xs`}>✓</Text>}
              </View>

              <Text
                style={[
                  tw`text-white text-[16px] tracking-[-0.32px]`,
                  { fontFamily: "manrope" },
                ]}>
                Даю згоду на обробку персональних даних
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
