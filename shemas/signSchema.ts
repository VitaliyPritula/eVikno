import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Введіть коректний email"),
  password: z.string().min(8, "Пароль повинен бути не менше 8 символів"),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Введіть коректний email"),
    password: z.string().min(8, "Пароль має бути не менше 8 символів"),
    confirmPassword: z.string().min(8, "Підтвердження пароля обов'язкове"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Паролі не збігаються",
  });
