import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(5, "Введіть ім’я"),
  city: z.string().min(1, "Вкажіть місто"),
  phone: z
    .string()
    .min(10, "Вкажи номер в форматі +38 000 000 00 00")
    .regex(/^\+38\d{10}$/, "Формат номера некоректний"),
  experience: z.string().min(1, "Вкажіть досвід роботи"),
  certificate: z
    .string()
    .min(8, "Вкажіть номер атестата")
    .regex(
      /^[A-Z]{2}\d{6}$/,
      "Формат атестата: дві великі латинські літери та 6 цифр (наприклад, AA123456)"
    ),
  carModel: z.string().min(3, "Вкажіть модель авто"),
  carNumber: z.string().min(3, "Вкажіть номер авто"),
  transmission: z.enum(["mechanic", "automatic"], {
    required_error: "Оберіть тип трансмісії",
  }),
});
