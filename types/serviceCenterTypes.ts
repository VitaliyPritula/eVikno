import { ServiceCenter } from "@/types/serviceCenterType";

export type ServiceCentersState = {
  centers: ServiceCenter[];
  cities: string[];
  loading: boolean;
  fetchCenters: () => Promise<void>;
  getCentersByCity: (city: string) => ServiceCenter[];
};
