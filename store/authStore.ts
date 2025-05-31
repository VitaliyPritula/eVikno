import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  deleteUser,
  User as FirebaseUser,
} from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export type InstructorProfile = {
  name: string;
  city: string;
  phone: string;
  experience: number; // роки досвіду
  certificate: string; // посилання на сертифікат
  carModel: string; // модель автомобіля
  carNumber: string; // номер автомобіля
  transmission: "mechanic" | "automatic"; // тип трансмісії
  isFree: boolean; // чи вільний інструктор
  uidInspector: string; // унікальний ідентифікатор користувача
  dateUpdate: Timestamp; // дата останнього оновлення профілю
  //role: "instructor" | "student";// роль користувача
  // timestamp;
  // другие поля
};
type AuthState = {
  user: FirebaseUser | null;
  profile: InstructorProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>; // = logout
  deleteAccount: () => Promise<void>; // 🆕 delete everything
  fetchProfile: (uid: string) => Promise<void>;
  updateProfile: (data: InstructorProfile) => Promise<void>;
};

// let unsubscribe: (() => void) | null = null;

export const useAuthStore = create<AuthState>((set, get) => {
  onAuthStateChanged(FIREBASE_AUTH, async (user) => {
    set({ user, loading: false });

    if (user) {
      await get().fetchProfile(user.uid);
    } else {
      set({ profile: null });
    }
  });
  return {
    user: null,
    profile: null,
    loading: false,

    signIn: async (email, password) => {
      set({ loading: true });
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      set({ user, loading: false });
      await get().fetchProfile(user.uid);
    },

    signUp: async (email, password) => {
      set({ loading: true });
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      set({ user, loading: false });
      // Create an empty profile for the new user
      set({ profile: null });
    },
    //logout
    signOut: async () => {
      set({ loading: true });
      await firebaseSignOut(FIREBASE_AUTH);
      set({ user: null, profile: null, loading: false });
    },
    // 🆕 delete everything
    deleteAccount: async () => {
      const { user } = get();
      if (!user) return;
      const uid = user.uid;
      // Delete Firestore profile
      await deleteDoc(doc(FIRESTORE_DB, "inspectors", uid));
      // Delete Firebase Authentication user
      await deleteUser(user);
      set({ user: null, profile: null });
    },

    fetchProfile: async (uid) => {
      const docRef = doc(FIRESTORE_DB, "inspectors", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ profile: docSnap.data() as InstructorProfile });
      } else {
        set({ profile: null }); // Якщо профіль не знайдено, встановлюємо null
      }
    },

    updateProfile: async (data) => {
      const user = get().user;
      if (!user) throw new Error("Пользователь не авторизован");

      // const updatedProfile = {
      //   ...data,
      //   dateUpdate: serverTimestamp(),
      // };
      const profileData: InstructorProfile = {
        ...data,
        uidInspector: user.uid,
        dateUpdate: serverTimestamp() as unknown as Timestamp, //
      };
      const docRef = doc(FIRESTORE_DB, "inspectors", user.uid);
      await setDoc(docRef, profileData, { merge: true });
      await setDoc(docRef, profileData);
      set({ profile: profileData });
    },
  };
});
