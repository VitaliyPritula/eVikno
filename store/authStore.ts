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
import { InstructorProfile } from "../types/instructorType";

// export type InstructorProfile = {
//   name: string;
//   city: string;
//   phone: string;
//   experience: string; // роки досвіду
//   certificate: string; // посилання на сертифікат
//   carModel: string; // модель автомобіля
//   carNumber: string; // номер автомобіля
//   transmission: "mechanic" | "automatic"; // тип трансмісії
//   isFree: boolean; // чи вільний інструктор
//   serviceCenter: string; // послуги, які надає інструктор
//   uidInspector: string; // унікальний ідентифікатор користувача
//   dateUpdate: Timestamp; // дата останнього оновлення профілю
// };

type InstructorProfileInput = Omit<
  InstructorProfile,
  "uidInspector" | "dateUpdate"
>;

type AuthState = {
  user: FirebaseUser | null;
  profile: InstructorProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>; // = logout
  deleteAccount: () => Promise<void>; // 🆕 delete everything
  fetchProfile: (uid: string) => Promise<void>;
  updateProfile: (data: InstructorProfileInput) => Promise<void>;
  toggleIsFree: (isFree: boolean, serviceCenter: string) => Promise<void>;
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
      // Delete Firestore profile  inspectors
      await deleteDoc(doc(FIRESTORE_DB, "instructors", uid));
      // Delete Firebase Authentication user
      await deleteUser(user);
      set({ user: null, profile: null });
    },

    fetchProfile: async (uid) => {
      const docRef = doc(FIRESTORE_DB, "instructors", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ profile: docSnap.data() as InstructorProfile });
      } else {
        set({ profile: null }); // Якщо профіль не знайдено, встановлюємо null
      }
    },

    updateProfile: async (data: InstructorProfileInput) => {
      const user = get().user;
      if (!user) throw new Error("Пользователь не авторизован");
      console.log("user", user.uid);
      // const updatedProfile = {
      //   ...data,
      //   dateUpdate: serverTimestamp(),
      // };
      const profileData: InstructorProfile = {
        ...data,
        uidInspector: user.uid,
        dateUpdate: serverTimestamp() as unknown as Timestamp, //
      };
      console.log("Prof Data", profileData);
      const docRef = doc(FIRESTORE_DB, "instructors", user.uid);
      await setDoc(docRef, profileData, { merge: true });
      // await setDoc(docRef, profileData);
      set({ profile: profileData });
    },

    toggleIsFree: async (isFree: boolean, serviceCenter: string) => {
      const user = get().user;
      if (!user) throw new Error("Пользователь не авторизован");

      const docRef = doc(FIRESTORE_DB, "instructors", user.uid);
      await setDoc(
        docRef,
        { isFree, serviceCenter, dateUpdate: serverTimestamp() },
        { merge: true }
      );

      set((state) => ({
        profile: state.profile ? { ...state.profile, isFree } : state.profile,
      }));
    },
  };
});
