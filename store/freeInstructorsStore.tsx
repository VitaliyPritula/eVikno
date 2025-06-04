// 📦 Zustand store для подписки на "вільних" інструкторів за обраним сервісним центром
import { create } from "zustand";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { InstructorProfile } from "@/types/instructorType";

// type InstructorsState = {
//   instructors: InstructorProfile[];
//   unsubscribe: (() => void) | null;
//   fetchFreeInstructors: (serviceCenterId: string) => void;
//   clearSubscription: () => void;
// };

type InstructorsState = {
  instructors: InstructorProfile[];
  unsubscribe: (() => void) | null;
  error: string | null;
  fetchFreeInstructors: (serviceCenterId: string) => void;
  clearSubscription: () => void;
};
export const useInstructorsStore = create<InstructorsState>((set, get) => ({
  instructors: [],
  unsubscribe: null,
  error: null,

  fetchFreeInstructors: (serviceCenterId: string) => {
    // Clear previous subscription if exists
    const oldUnsub = get().unsubscribe;
    if (oldUnsub) oldUnsub();

    const q = query(
      collection(FIRESTORE_DB, "instructors"),
      where("isFree", "==", true),
      where("serviceCenterId", "==", serviceCenterId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const instructors: InstructorProfile[] = snapshot.docs.map(
          (doc) => doc.data() as InstructorProfile
        );
        set({ instructors, error: null });
      },
      (error) => {
        console.error("Error while getting instructors :", error);
        set({
          error: "Не вдалося завантажити список інструкторів. Спробуйте ще раз",
        });
      }
    );

    set({ unsubscribe });
  },

  clearSubscription: () => {
    const unsub = get().unsubscribe;
    if (unsub) {
      unsub();
      set({ unsubscribe: null, instructors: [], error: null });
    }
  },
}));
