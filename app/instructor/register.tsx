import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import { style } from "twrnc";
//import { FIREBASE_AUTH } from "../../firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";

export default function RegisterScreen() {
  const user = useAuthStore((state) => state.user);
  console.log("user in Reg", user);
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

  // const auth = FIREBASE_AUTH;
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("current", user.uid);
  //   }
  // });
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
    router.push("/instructor/signin"); // ⬅️ Переходить на сторінку реєстрації
  };

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/instructor/main");
    }, 1500); // Затримка в 1.5 секунди
  };

  return (
    <View style={style("flex-1 ")}>
      {/* Хедер */}
      <View style={style("w-full h-14 bg-black justify-center items-center")}>
        <Text style={style("text-white text-base font-bold")}></Text>
      </View>

      <ScrollView
        contentContainerStyle={style("pb-15 px-[15px] relative")}
        showsVerticalScrollIndicator={false}>
        <View style={style("max-w-[320px] w-full mx-auto pt-6")}>
          <Text
            style={[
              style(
                "text-white text-[18px] text-center leading-[22px] mb-3 font-bold"
              ),
              { fontFamily: "manrope" },
            ]}>
            Створіть профіль інструктора
          </Text>

          <Text
            style={[
              style(
                "text-[#C7C7C7] text-[16px] leading-[22px] font-regular tracking-[-0.32px] mb-8"
              ),
              { fontFamily: "manrope" },
            ]}>
            Щоб почати приймати учнів, заповни коротку форму. {"\n"} Це займе до
            5 хвилин.
          </Text>

          {/* Ім’я */}
          <View style={style("w-full mb-3")}>
            <Text
              style={[
                style(
                  "text-[#FDFDFD] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular"
                ),
                { fontFamily: "manrope" },
              ]}>
              1.Персональні дані
            </Text>
            <Text style={style("text-[#C7C7C7] text-left text-[16px] mb-1")}>
              Ім’я та Прізвище <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              // placeholdertextcolor="#646464"
              value={name}
              onChangeText={setName}
              style={[
                style(
                  "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                  errors.name ? "border-red-500" : "border-gray-500"
                ),
              ]}
            />
            {errors.name ? (
              <Text style={style("text-red-500 text-sm pl-1 mt-1")}>
                {errors.name}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm pl-1 mt-1")}>
                Наприклад: Іван Пінчук
              </Text>
            )}
          </View>

          {/* Місто */}
          <View style={style("w-full mb-3")}>
            <Text style={style("text-[#C7C7C7] text-left text-[16px] mb-1")}>
              Місто <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#fff"
              value={city}
              onChangeText={setCity}
              style={style(
                "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.city ? (
              <Text style={style("text-red-500 text-sm pl-1 mt-1")}>
                {errors.city}
              </Text>
            ) : (
              <Text style={style("text-[#D7D7D7] text-sm pl-1 mt-1")}>
                Вкажи місто, в якому працюєш
              </Text>
            )}
          </View>

          {/* Телефон */}
          <Text
            style={[
              style(
                "text-[#C7C7C7] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular"
              ),
              { fontFamily: "manrope" },
            ]}>
            2.Контакти
          </Text>
          <View style={style("w-full mb-6")}>
            <Text style={style("text-[#C7C7C7] text-left text-[16px] mb-1")}>
              Номер телефону <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={style(
                "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            {errors.phone ? (
              <Text
                style={style(
                  "text-red-500 text-[12px] pl-1 mt-1 tracking-[-0.70px]"
                )}>
                {errors.phone}
              </Text>
            ) : (
              <Text
                style={style(
                  "text-[#D7D7D7] text-[12px] tracking-[-0.70px] pl-1 mt-1"
                )}>
                Вкажи номер у форматі +38 000 000 00 00
              </Text>
            )}
          </View>

          {/* Досвід */}
          <View style={style("w-full mb-5")}>
            <Text
              style={[
                style(
                  "text-[#C7C7C7] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular"
                ),
                { fontFamily: "manrope" },
              ]}>
              3.Досвід
            </Text>
            <Text style={style("text-[#C7C7C7] text-left text-[16px] mb-1")}>
              Досвід роботи <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={experience}
              onChangeText={setExperience}
              style={style(
                "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            <Text style={style("text-[#D7D7D7] text-sm pl-1 mt-1 mb-3")}>
              Вказати в роках. Наприклад 4 роки
            </Text>

            {/* Атестат */}
            <Text style={style("text-[#C7C7C7] text-left text-[16px] mb-1")}>
              Атестат інструктора <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={certificate}
              onChangeText={setCertificate}
              style={style(
                "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
          </View>

          {/* Автомобіль */}
          <View style={style("w-full mb-5")}>
            <Text
              style={[
                style(
                  "text-[#C7C7C7] text-left text-[16px] tracking-[-0.32px] mb-4 font-regular"
                ),
                { fontFamily: "manrope" },
              ]}>
              4.Автомобіль
            </Text>
            <Text style={style("text-[#C7C7C7] text-left text-[16px] mb-1")}>
              Марка та модель авто <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={carModel}
              onChangeText={setCarModel}
              style={style(
                "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />
            <Text style={style("text-[#D7D7D7] text-sm pl-1 mt-1")}>
              Наприклад: Skoda Octavia
            </Text>

            <Text
              style={style("text-[#C7C7C7] text-left text-[16px] pt-3 mb-3")}>
              Державний знак <Text style={style("text-red-500")}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor="#ccc"
              value={carPlate}
              onChangeText={setCarPlate}
              style={style(
                "border-[2px] border-[#BDBDBD] bg-[#646464] rounded-[23px] px-4 py-3 text-white",
                errors.name ? "border-red-500" : "border-gray-500"
              )}
            />

            {/* Трансмісія */}
            <Text
              style={style("text-[#C7C7C7] text-left text-[16px] pt-3 mb-3")}>
              Тип трансмісії <Text style={style("text-red-500")}>*</Text>
            </Text>
            <Pressable
              onPress={() => setTransmission("mechanic")}
              style={style("flex-row items-center mb-4")}>
              <View
                style={style(
                  "w-5 h-5 rounded-full border border-white mr-2 items-center justify-center",
                  transmission === "mechanic" && "bg-white"
                )}>
                {transmission === "mechanic" && (
                  <View style={style("w-2 h-2 rounded-full bg-black")} />
                )}
              </View>
              <Text
                style={[
                  style("text-white text-[16px]"),
                  { fontFamily: "manrope" },
                ]}>
                Механіка
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setTransmission("auto")}
              style={style("flex-row items-center")}>
              <View
                style={style(
                  "w-5 h-5 rounded-full border border-white mr-2 items-center justify-center",
                  transmission === "auto" && "bg-white"
                )}>
                {transmission === "auto" && (
                  <View style={style("w-2 h-2 rounded-full bg-black")} />
                )}
              </View>
              <Text
                style={[
                  style("text-white text-[16px]"),
                  { fontFamily: "manrope" },
                ]}>
                Автомат
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleRegister}
            className="bg-green w-full py-3 rounded-[23px] mb-4">
            <Text
              style={[
                style("text-center text-black text-lg font-bold"),
                { fontFamily: "ptsansnaBold" },
              ]}>
              Зберегти дані
            </Text>
          </Pressable>

          <View className="w-full items-center justify-center ">
            <Pressable
              className="border-2 border-purple w-full py-3 rounded-[23px] mb-4"
              onPress={handlePress}
              disabled={isLoading}>
              <Text className="text-center text-purple text-lg font-bold font-ptsansnaBold">
                Заповнити пізніше
              </Text>
            </Pressable>
          </View>
          {/* Прелоад — окрема абсолютна обгортка поверх усього */}
          {isLoading && (
            <View className="absolute w-[105%] h-[50%] top-[60%] left-0 items-center justify-center bg-black z-10">
              <Image
                source={require("../../assets/images/Logo_2.png")}
                className=" mb-4"
              />
              <Text className="text-white text-m">
                Реєстрація пройшла успішно
              </Text>
            </View>
          )}

          {/* Чекбокси */}
          <View>
            <Pressable
              onPress={() => setAgreeConsent(!agreeConsent)}
              style={style("flex-row items-center mb-4")}>
              <View
                style={style(
                  "w-5 h-5 rounded-full border mr-2 items-center justify-center",
                  agreeConsent ? "border-white bg-white" : "border-white",
                  showError && !agreeConsent && "border-red-500"
                )}>
                {agreeConsent && (
                  <Text style={style("text-black text-xs")}>✓</Text>
                )}
              </View>

              <Text
                style={[
                  style("text-white text-[16px] tracking-[-0.32px]"),
                  { fontFamily: "manrope" },
                ]}>
                Я погоджуюсь з умовами користування платформою
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setAgreePrivacy(!agreePrivacy)}
              style={style("flex-row items-center")}>
              <View
                style={style(
                  "w-5 h-5 rounded-full border mr-2 items-center justify-center",
                  agreePrivacy ? "border-white bg-white" : "border-white",
                  showError && !agreePrivacy && "border-red-500"
                )}>
                {agreePrivacy && (
                  <Text style={style("text-black text-xs")}>✓</Text>
                )}
              </View>

              <Text
                style={[
                  style("text-white text-[16px] tracking-[-0.32px]"),
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
