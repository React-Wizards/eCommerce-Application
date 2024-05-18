import { Validator } from '../../model/types';

const DEFAULT_MIN_CHAR_COUNT = 1;
const ERROR_MESSAGE = 'The number of characters cannot be less than';

const minLength: (opt?: number) => Validator<string> = (
  minCharCount = DEFAULT_MIN_CHAR_COUNT
) => {
  if (minCharCount <= 0) {
    throw new Error(
      `Validator minLength expect positive min length, but got: ${minCharCount}`
    );
  }

  return async (value) =>
    value.replace(/\s/g, '').length >= minCharCount
      ? null
      : `${ERROR_MESSAGE} ${minCharCount}`;
};

export { DEFAULT_MIN_CHAR_COUNT };
export default minLength;
