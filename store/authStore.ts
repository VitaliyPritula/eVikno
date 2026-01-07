// store/authStore.ts
import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  deleteUser,
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  signInWithPopup,
  linkWithCredential,
  User,
} from "firebase/auth";
import { Platform } from "react-native";
import { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { InstructorProfile, InstructorProfileInput } from "@/types/instructorType";
import { AuthState } from "@/types/authStateTypes";

export const useAuthStore = create<AuthState>((set, get) => {
  const auth = getAuth(FIREBASE_APP);

  // Слідкуємо за зміною авторизації
  onAuthStateChanged(FIREBASE_AUTH, async (user) => {
    set({ user, loading: false });
    if (user) {
      await get().fetchProfile(user.uid);
    } else {
      set({ profile: null });
    }
  });

  const SIGNIN_ERROR_MESSAGES: Record<string, string> = {
    "auth/invalid-email": "Невірний формат email",
    "auth/user-not-found": "Користувача не знайдено",
    "auth/wrong-password": "Невірний пароль",
    "auth/too-many-requests": "Забагато спроб входу. Спробуйте пізніше",
  };

  return {
    user: null,
    profile: null,
    loading: false,

    // --- Email/Password Sign-In ---
    signIn: async (email: string, password: string) => {
      set({ loading: true });
      try {
        const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        const user = userCredential.user;
        set({ user, loading: false });
        await get().fetchProfile(user.uid);
      } catch (error: any) {
        set({ loading: false });
        console.error("Firebase signIn error:", error.code, error.message);
        throw new Error(
          SIGNIN_ERROR_MESSAGES[error.code] || "Сталася помилка авторизації"
        );
      }
    },

    // --- Google Sign-In ---
    signInWithGoogle: async (idToken?: string) => {
      set({ loading: true });
      try {
        let userCredential;

        if (Platform.OS === "web") {
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
          userCredential = await signInWithPopup(auth, provider);
        } else {
          if (!idToken) throw new Error("No Google idToken provided");
          const credential = GoogleAuthProvider.credential(idToken);

          if (auth.currentUser) {
            // Лінкування Google до існуючого акаунта
            userCredential = await linkWithCredential(auth.currentUser, credential);
          } else {
            // Новий користувач через Google
            userCredential = await signInWithCredential(auth, credential);
          }
        }

        const user = userCredential.user;
        set({ user, loading: false });
        await get().fetchProfile(user.uid);

      } catch (error: any) {
        set({ loading: false });
        console.error("Firebase Google Sign-In error:", error);
        throw new Error("Сталася помилка авторизації через Google");
      }
    },

    // --- Email/Password Sign-Up ---
    signUp: async (email: string, password: string) => {
      set({ loading: true });
      try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        set({ user: userCredential.user, profile: null, loading: false });
      } catch (error: any) {
        set({ loading: false });
        console.error("Firebase signUp error:", error.code, error.message);
        throw new Error("Сталася помилка при реєстрації");
      }
    },

    // --- Sign Out ---
    signOut: async () => {
      set({ loading: true });
      await firebaseSignOut(FIREBASE_AUTH);
      set({ user: null, profile: null, loading: false });
    },

    // --- Delete Account ---
    deleteAccount: async () => {
      const { user } = get();
      if (!user) return;
      await deleteDoc(doc(FIRESTORE_DB, "instructors", user.uid));
      await deleteUser(user);
      set({ user: null, profile: null });
    },

    // --- Fetch Profile ---
    fetchProfile: async (uid: string) => {
      const docRef = doc(FIRESTORE_DB, "instructors", uid);
      const docSnap = await getDoc(docRef);
      set({ profile: docSnap.exists() ? (docSnap.data() as InstructorProfile) : null });
    },

    // --- Update Profile ---
    updateProfile: async (data: InstructorProfileInput) => {
      const user = get().user;
      if (!user) throw new Error("Користувач не авторизований");
      const profileData: InstructorProfile = {
        ...data,
        uidInstructor: user.uid,
        dateUpdate: serverTimestamp() as unknown as Timestamp,
      };
      await setDoc(doc(FIRESTORE_DB, "instructors", user.uid), profileData, { merge: true });
      set({ profile: profileData });
    },

    // --- Toggle Free Status ---
    toggleIsFree: async (isFree: boolean, serviceCenterId: string) => {
      const user = get().user;
      if (!user) throw new Error("Користувач не авторизований");

      const docRef = doc(FIRESTORE_DB, "instructors", user.uid);
      await setDoc(docRef, { isFree, serviceCenterId, dateUpdate: serverTimestamp() }, { merge: true });
      await get().fetchProfile(user.uid);

      set((state) => ({
        profile: state.profile
          ? { ...state.profile, isFree, serviceCenterId, dateUpdate: serverTimestamp() as unknown as Timestamp }
          : state.profile,
      }));
    },
  };
});
