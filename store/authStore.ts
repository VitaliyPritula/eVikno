import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  //   onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

type AuthState = {
  user: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// let unsubscribe: (() => void) | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  // if (!unsubscribe) {
  //     unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //       set({ user, loading: false });
  //     });
  // }
  // return{те що знизу}
  user: null,
  loading: false,

  signIn: async (email, password) => {
    set({ loading: true });
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    set({ user: userCredential.user, loading: false });
  },

  signUp: async (email, password) => {
    set({ loading: true });
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    set({ user: userCredential.user, loading: false });
  },

  signOut: async () => {
    set({ loading: true });
    await firebaseSignOut(FIREBASE_AUTH);
    set({ user: null, loading: false });
  },
}));
