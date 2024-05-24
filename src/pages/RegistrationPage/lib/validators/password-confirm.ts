import type { ValidableField, Validator } from '../../model/types';

const ERROR_MESSAGE = 'Passwords must match';

const passwordConfirm: (ref?: ValidableField) => Validator<string> = (ref) => {
  return async (value) => (ref?.value == value ? null : `${ERROR_MESSAGE}`);
};

export default passwordConfirm;
