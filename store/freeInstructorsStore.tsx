// 📦 Zustand store для подписки на "вільних" інструкторів за обраним сервісним центром
import { create } from "zustand";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { InstructorProfile } from "../types/instructorType";

type InstructorsState = {
  instructors: InstructorProfile[];
  unsubscribe: (() => void) | null;
  fetchFreeInstructors: (serviceCenterId: string) => void;
  clearSubscription: () => void;
};

export const useInstructorsStore = create<InstructorsState>((set, get) => ({
  instructors: [],
  unsubscribe: null,

  fetchFreeInstructors: (serviceCenterId: string) => {
    // Clear previous subscription if exists
    const oldUnsub = get().unsubscribe;
    if (oldUnsub) oldUnsub();

    const q = query(
      collection(FIRESTORE_DB, "instructors"),
      where("isFree", "==", true),
      where("serviceCenter", "==", serviceCenterId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const instructors: InstructorProfile[] = snapshot.docs.map(
        (doc) => doc.data() as InstructorProfile
      );
      set({ instructors });
    });

    set({ unsubscribe });
  },

  clearSubscription: () => {
    const unsub = get().unsubscribe;
    if (unsub) {
      unsub();
      set({ unsubscribe: null, instructors: [] });
    }
  },
}));

//in component
// import { useEffect } from "react";
// import { useInstructorsStore } from "../stores/useInstructorsStore";

// const FreeInstructorsList = ({
//   selectedServiceCenterId,
// }: {
//   selectedServiceCenterId: string;
// }) => {
//   const { instructors, fetchFreeInstructors, clearSubscription } =
//     useInstructorsStore();

//   useEffect(() => {
//     if (selectedServiceCenterId) {
//       fetchFreeInstructors(selectedServiceCenterId);
//     }

//     return () => {
//       clearSubscription();
//     };
//   }, [selectedServiceCenterId]);

//   return (
//     <FlatList
//       data={instructors}
//       keyExtractor={(item) => item.uidInspector}
//       renderItem={({ item }) => (
//         <Text>
//           {item.name} — {item.carModel}
//         </Text>
//       )}
//     />
//   );
// };
