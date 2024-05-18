import { Validator } from '../../model/types';

const ERROR_MESSAGE = 'Must contain uppercase and lowercase letters';

const differentCase: (opt?: string) => Validator<string> = (
  errorMessage = ERROR_MESSAGE
) => {
  return async (value) =>
    value.toLowerCase() === value || value.toUpperCase() === value
      ? errorMessage
      : null;
};

export { differentCase };
