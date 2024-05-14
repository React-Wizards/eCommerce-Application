export type ValidationResult = {
  result: boolean;
  message: string;
};

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const enum errorMessagesEmail {
  Whitespace = 'Email address cannot contain leading or trailing whitespace.',
  AtSymbol = "Email address must contain an '@' symbol.",
  MultipleAtSymbols = "Email address cannot contain more than one '@' symbol.",
  MissingDomain = 'Email address must contain a domain name (e.g., example.com).',
  InvalidFormat = 'Email address is not properly formatted.'
}

const emailValidator = (value: string): ValidationResult => {
  const res: ValidationResult = {
    result: false,
    message: ''
  };

  if (!regex.test(value)) {
    if (/\s/.test(value)) {
      res.message = errorMessagesEmail.Whitespace;
    } else if (value.indexOf('@') === -1) {
      res.message = errorMessagesEmail.AtSymbol;
    } else if (value.split('@').length > 2) {
      res.message = errorMessagesEmail.MultipleAtSymbols;
    } else if (!/\./.test(value.split('@')[1])) {
      res.message = errorMessagesEmail.MissingDomain;
    } else {
      res.message = errorMessagesEmail.InvalidFormat;
    }
    res.result = false;
  } else {
    res.result = true;
    res.message = '';
  }
  return res;
};

export { emailValidator };
