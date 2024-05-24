import type { Validator } from '../../model/types';

const REGEX =
  /^[+]?([0-9]{1,3})[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/im;
const ERROR_MESSAGE = 'The phone number must be formatted properly';

const phoneNumber: () => Validator<string> = (errorMessage = ERROR_MESSAGE) => {
  return async (value) => (REGEX.test(value) ? null : errorMessage);
};

export default phoneNumber;
