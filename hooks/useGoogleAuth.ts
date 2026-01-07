// hooks/useGoogleAuth.ts
import { useEffect, useState, useMemo } from "react";
import { Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useAuthStore } from "@/store/authStore";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_IDS = {
  ios: "33697798039-63m2c4vrihnqplilruam0mairkk50lus.apps.googleusercontent.com",
  android: "33697798039-1917s135bgu8172jd0rvt69l2i4oisq3.apps.googleusercontent.com",
  web: "33697798039-j335dgtg8hd5alosihbcu7iinmkn5con.apps.googleusercontent.com",
};

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signInWithGoogleStore = useAuthStore((state) => state.signInWithGoogle);

  // Memo щоб не створювати нові об'єкти при кожному рендері
  const clientId = useMemo(() => Platform.select(GOOGLE_CLIENT_IDS), []);
  const redirectUri = useMemo(
    () =>
      Platform.select({
        ios: "com.evikno.app:/oauthredirect",
        android: "com.evikno.app:/oauthredirect",
        web: window.location.origin,
      }),
    []
  );

  // Ініціалізація Google Auth Request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId,
    redirectUri,
  });

  // --- Обробка мобільного Google Sign-In ---
  useEffect(() => {
    const handleMobileSignIn = async () => {
      if (response?.type !== "success") return;

      const idToken = response.params?.id_token;
      if (!idToken) return;

      setIsLoading(true);
      try {
        // Передаємо idToken у authStore
        await signInWithGoogleStore(idToken);
      } catch (err) {
        console.error("Google mobile auth error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    handleMobileSignIn();
  }, [response, signInWithGoogleStore]);

  // --- Функція для кнопки Google Sign-In ---
  const signIn = async () => {
    setIsLoading(true);
    try {
      if (Platform.OS === "web") {
        // На вебі redirect обробляється в authStore через signInWithPopup
        await signInWithGoogleStore();
      } else {
        if (!request) throw new Error("Google request object is not ready");

        // useProxy = true обов’язково для Expo Go, showInRecents для Android
        await promptAsync({ useProxy: true, showInRecents: true });
      }
    } catch (err) {
      console.error("Google auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithGoogle: signIn,
    isLoading,
  };
};
