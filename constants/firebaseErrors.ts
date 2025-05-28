export const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  "auth/email-already-in-use": "Користувач з таким email вже існує",
  "auth/invalid-email": "Невірний формат email",
  "auth/weak-password": "Пароль надто слабкий (мінімум 6 символів)",
  "auth/too-many-requests": "Забагато спроб. Спробуйте пізніше",
  "auth/network-request-failed": "Проблема з інтернет-з’єднанням",
  "auth/internal-error": "Внутрішня помилка. Спробуйте ще раз",
};

export const SIGNIN_ERROR_MESSAGES: Record<string, string> = {
  "auth/user-not-found": "Користувача з таким email не знайдено",
  "auth/wrong-password": "Невірний пароль",
  "auth/invalid-email": "Невірний формат email",
  "auth/user-disabled": "Користувача деактивовано",
  "auth/too-many-requests": "Забагато спроб. Спробуйте пізніше",
  "auth/network-request-failed": "Проблема з інтернет-з’єднанням",
  "auth/internal-error": "Внутрішня помилка. Спробуйте ще раз",
  "auth/invalid-credential": "Невірні пароль або email",
};
export type FirebaseErrorCode = keyof typeof SIGNUP_ERROR_MESSAGES;
