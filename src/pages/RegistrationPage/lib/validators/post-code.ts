import type { ValidableField, Validator } from '../../model/types';

const REGEXES: { [key: string]: RegExp } = {
  Belarus: /^\d{6}$/,
  Germany: /^\d{6}$/,
  Kazakhstan: /^\d{6}$/,
  Russia: /^\d{6}$/,
  USA: /(^\d{5}$)|(^\d{5}-\d{4}$)/
};

const ERROR_MESSAGE = 'Post code must be formatted properly';

const postCode: (opt?: ValidableField) => Validator<string> = (ref) => {
  return async (value) => {
    if (ref?.value) {
      return REGEXES[ref.value].test(value) ? null : `${ERROR_MESSAGE}`;
    } else {
      return null;
    }
  };
};

export default postCode;
