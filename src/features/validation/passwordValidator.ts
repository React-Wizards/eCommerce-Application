type ValidationResult = {
  result: boolean;
  message: string;
};

const errorMessagePassword =
  'Password must be 8+ characters with only letters (upper/lowercase) and digits';

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const minLength = 8;

function passwordValidator(value: string): ValidationResult {
  const isValid = regex.test(value) && value.length >= minLength;
  return {
    result: isValid,
    message: !isValid ? errorMessagePassword : ''
  };
}

export { passwordValidator };
