type ValidationResult = {
  result: boolean;
  message: string;
};

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const errorMessageEmail =
  'Email address is not properly formatted, e.g. user@gmail.com';

export const emailValidator = (value: string): ValidationResult => {
  const isValidRes = regex.test(value);
  return {
    result: isValidRes,
    message: isValidRes ? '' : errorMessageEmail
  };
};
