import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { InstructorProfile } from "@/types/instructorType";

export const getFreeInstructors = async (serviceCenterId: string): Promise<InstructorProfile[]> => {
  const q = query(
    collection(FIRESTORE_DB, "instructors"),
    where("isFree", "==", true),
    where("serviceCenterId", "==", serviceCenterId)
  );

  const querySnapshot = await getDocs(q);
  const instructors: InstructorProfile[] = [];

  querySnapshot.forEach((doc) => {
    instructors.push(doc.data() as InstructorProfile);
  });

  return instructors;
};
