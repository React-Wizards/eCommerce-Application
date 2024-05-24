import type { Validator } from '../../model/types';

const DEFAULT_MIN_DIGITS_COUNT = 1;
const ERROR_MESSAGE = 'The number of digits cannot be less than';

const minDigits: (opt?: number) => Validator<string> = (
  minDigitsCount = DEFAULT_MIN_DIGITS_COUNT
) => {
  return async (value) =>
    value.replace(/[^0-9]/g, '').length >= minDigitsCount
      ? null
      : `${ERROR_MESSAGE} ${minDigitsCount}`;
};

export default minDigits;
