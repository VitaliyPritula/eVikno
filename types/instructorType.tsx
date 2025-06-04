import { Timestamp } from "firebase/firestore";
export type InstructorProfile = {
  name: string;
  city: string;
  phone: string;
  experience: string; // роки досвіду
  certificate: string; // посилання на сертифікат
  carModel: string; // модель автомобіля
  carNumber: string; // номер автомобіля
  transmission: "mechanic" | "automatic"; // тип трансмісії
  isFree: boolean; // чи вільний інструктор
  serviceCenterId: string; // послуги, які надає інструктор
  uidInstructor: string; // унікальний ідентифікатор користувача
  dateUpdate: Timestamp; // дата останнього оновлення профілю
};

export type InstructorProfileInput = Omit<
  InstructorProfile,
  "uidInstructor" | "dateUpdate"
>;
