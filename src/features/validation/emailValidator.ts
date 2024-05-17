type ValidationResult = {
  result: boolean;
  message: string;
};

const regex =
  /^(?=[a-zA-Z0-9]*[a-z])[a-zA-Z0-9]+@[a-zA-Z0-9]{2,}(\.[a-zA-Z]{2,})+$/;

const errorMessageEmail =
  'Email address is not properly formatted, e.g. user@gmail.com';

export const emailValidator = (value: string): ValidationResult => {
  const isValidRes = regex.test(value);
  return {
    result: isValidRes,
    message: isValidRes ? '' : errorMessageEmail
  };
};
