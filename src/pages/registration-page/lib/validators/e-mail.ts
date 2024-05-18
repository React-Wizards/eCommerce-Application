import { Validator } from '../../model/types';

const REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const ERROR_MESSAGE = 'The e-mail address must be formatted properly';

const email: () => Validator<string> = (errorMessage = ERROR_MESSAGE) => {
  return async (value) => (REGEX.test(value) ? null : errorMessage);
};

export default email;
