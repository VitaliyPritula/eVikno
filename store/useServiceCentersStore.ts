import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { ServiceCenter } from "../types/serviceCenterType";

// export type ServiceCenter = {
//   id: string;
//   city: string;
//   address: string;
// };

type ServiceCentersState = {
  centers: ServiceCenter[];
  cities: string[];
  loading: boolean;
  fetchCenters: () => Promise<void>;
  getCentersByCity: (city: string) => ServiceCenter[];
};

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
      const centers: ServiceCenter[] = snapshot.docs.map(
        (doc) => doc.data() as ServiceCenter
      );

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
