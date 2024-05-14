import { ValidationResult } from './emailValidator';

const enum errorMessagesPassword {
  Length = 'Password must be at least 8 characters long.',
  Uppercase = 'Password must contain at least one uppercase letter (A-Z).',
  Lowercase = 'Password must contain at least one lowercase letter (a-z).',
  Digit = 'Password must contain at least one digit (0-9).',
  SpecialChar = 'Password must contain at least one special character (e.g., !@#$%^&*).',
  Whitespace = 'Password must not contain leading or trailing whitespace.'
}

const minLength = 8;

function passwordValidator(value: string): ValidationResult {
  const res: ValidationResult = {
    result: false,
    message: ''
  };

  if (value.length < minLength) {
    res.message = errorMessagesPassword.Length;
  }

  if (!/[A-Z]/.test(value)) {
    res.message = errorMessagesPassword.Uppercase;
  }

  if (!/[a-z]/.test(value)) {
    res.message = errorMessagesPassword.Lowercase;
  }

  if (!/\d/.test(value)) {
    res.message = errorMessagesPassword.Digit;
  }

  if (!/[^a-zA-Z0-9]/.test(value)) {
    res.message = errorMessagesPassword.SpecialChar;
  }

  if (/\s/.test(value)) {
    res.message = errorMessagesPassword.Whitespace;
  }

  return res.message === ''
    ? { result: true, message: '' }
    : { result: false, message: res.message };
}

export { passwordValidator };
