import type { Validator } from '../../model/types';

const DEFAULT_MIN_AGE = 18;
const ERROR_MESSAGE = 'The age must be above than ';
const MILLIS_IN_YEAR = 1000 * 60 * 60 * 24 * 365.2425;

const notYounger: (opt?: number) => Validator<string> = (
  minAge = DEFAULT_MIN_AGE
) => {
  if (minAge <= 0) {
    throw new Error(
      `Validator notYounger expect positive min age, but got: ${minAge}`
    );
  }

  return async (value) =>
    Math.floor((Date.now() - Date.parse(value)) / MILLIS_IN_YEAR) >= minAge
      ? null
      : `${ERROR_MESSAGE} ${minAge}`;
};

export { DEFAULT_MIN_AGE };
export default notYounger;
