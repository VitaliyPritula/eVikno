import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "@/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_IDS = {
  ios: "33697798039-63m2c4vrihnqplilruam0mairkk50lus.apps.googleusercontent.com",
  android: "33697798039-hiu2nu8htfkt1tb434e42fjdiohrdfbq.apps.googleusercontent.com",
  web: "33697798039-hiu2nu8htfkt1tb434e42fjdiohrdfbq.apps.googleusercontent.com",
};

export const useGoogleAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select(GOOGLE_CLIENT_IDS),
    redirectUri: Platform.select({
      ios: "com.evikno.app:/oauthredirect",
      android: "com.evikno.app:/oauthredirect",
      web: window.location.origin,
    }),
  });

  useEffect(() => {
    const signInMobile = async () => {
      if (response?.type === "success") {
        try {
          setIsLoading(true);
          const { id_token } = response.params;
          if (!id_token) throw new Error("No id_token returned");

          const auth = getAuth(FIREBASE_AUTH);
          const credential = GoogleAuthProvider.credential(id_token);
          const result = await signInWithCredential(auth, credential);
          setUser(result.user);
        } catch (err) {
          console.error("Google Mobile Sign-In Error:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    signInMobile();
  }, [response]);

  const signInWithGoogleWeb = async () => {
    try {
      setIsLoading(true);
      const auth = getAuth(FIREBASE_APP);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Google Web Sign-In Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (Platform.OS === "web") {
      await signInWithGoogleWeb();
    } else {
      if (request) {
        setIsLoading(true);
        await promptAsync();
      } else {
        console.error("Google request object is not ready");
      }
    }
  };

  return { user, signInWithGoogle, isLoading };
};
