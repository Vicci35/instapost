// validators.ts
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export const checkInput = (
  field: string,
  value: string,
  allValues?: { [key: string]: string }
): ValidationResult => {
  switch (field) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, message: "Ogiltig emailadress" };
      }
      break;

    case "password":
      if (value.length < 8 || !/\d/.test(value)) {
        return {
          valid: false,
          message:
            "Lösenordet måste vara minst 8 tecken och innehålla en siffra",
        };
      }
      break;

    case "repeatPassword":
      if (allValues && value !== allValues.password) {
        return { valid: false, message: "Lösenorden matchar inte" };
      }
      break;

    case "username":
      if (value.trim().length < 3) {
        return {
          valid: false,
          message: "Användarnamnet måste vara minst 3 tecken",
        };
      }
      break;
  }

  return { valid: true };
};
