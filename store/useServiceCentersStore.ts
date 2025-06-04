import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { ServiceCenter } from "@/types/serviceCenterType";
import { ServiceCentersState } from "@/types/serviceCenterTypes";

export const useServiceCentersStore = create<ServiceCentersState>(
  (set, get) => ({
    centers: [],
    cities: [],
    loading: false,

    fetchCenters: async () => {
      set({ loading: true });
      const snapshot = await getDocs(
        collection(FIRESTORE_DB, "service_centers")
      );
      const centers: ServiceCenter[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ServiceCenter, "id">),
      }));

      const uniqueCities = Array.from(
        new Set(centers.map((c) => c.city))
      ).sort();

      set({
        centers,
        cities: uniqueCities,
        loading: false,
      });
    },

    getCentersByCity: (city: string) => {
      return get().centers.filter((center) => center.city === city);
    },
  })
);
