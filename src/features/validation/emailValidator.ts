type ValidationResult = {
  result: boolean;
  message: string;
};

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const errorMessageEmail =
  'Email address is not properly formatted, e.g. user@gmail.com';

export const emailValidator = (value: string): ValidationResult => {
  return {
    result: regex.test(value),
    message: !regex.test(value) ? errorMessageEmail : ''
  };
};
