import type { Validator } from '../../model/types';

const REGEX = /[а-яА-Яa-zA-Z]+/gi;

const ERROR_MESSAGE = 'Must contain only letters';

const onlyLetters: () => Validator<string> = (errorMessage = ERROR_MESSAGE) => {
  return async (value) =>
    value.replace(REGEX, '').length == 0 ? null : `${errorMessage}`;
};

export default onlyLetters;
