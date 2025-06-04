import {
  InstructorProfile,
  InstructorProfileInput,
} from "@/types/instructorType";

import { User as FirebaseUser } from "firebase/auth";

export type AuthState = {
  user: FirebaseUser | null;
  profile: InstructorProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>; // = logout
  deleteAccount: () => Promise<void>; // 🆕 delete everything
  fetchProfile: (uid: string) => Promise<void>;
  updateProfile: (data: InstructorProfileInput) => Promise<void>;
  toggleIsFree: (isFree: boolean, serviceCenterId: string) => Promise<void>;
};
