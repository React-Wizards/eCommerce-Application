export type ValidationResult = {
  result: boolean;
  message: string;
};

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const enum ErrorMessagesEmail {
  Whitespace = 'Email address cannot contain leading or trailing whitespace.',
  AtSymbol = "Email address must contain an '@' symbol.",
  MultipleAtSymbols = "Email address cannot contain more than one '@' symbol.",
  MissingDomain = 'Email address must contain a domain name (e.g., example.com).',
  InvalidFormat = 'Email address is not properly formatted.'
}

export const emailValidator = (value: string): ValidationResult => {
  const res: ValidationResult = {
    result: true,
    message: ''
  };

  if (!regex.test(value)) {
    if (/\s/.test(value)) {
      res.message = ErrorMessagesEmail.Whitespace;
    } else if (value.indexOf('@') === -1) {
      res.message = ErrorMessagesEmail.AtSymbol;
    } else if (value.split('@').length > 2) {
      res.message = ErrorMessagesEmail.MultipleAtSymbols;
    } else if (!/\./.test(value.split('@')[1])) {
      res.message = ErrorMessagesEmail.MissingDomain;
    } else {
      res.message = ErrorMessagesEmail.InvalidFormat;
    }
    res.result = false;
  }

  return res;
};
