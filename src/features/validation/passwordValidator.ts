type ValidationResult = {
  result: boolean;
  message: string;
};

const errorMessagePassword =
  'Password must be 8+ characters with only letters (upper/lowercase), digits and [!@#$%^&*]';

const regex =
  /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const passwordValidator = (value: string): ValidationResult => {
  return {
    result: regex.test(value),
    message: !regex.test(value) ? errorMessagePassword : ''
  };
};
