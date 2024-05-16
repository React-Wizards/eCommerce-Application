import { Validator } from '../../model/types';

const ERROR_MESSAGE = 'The field is required';

const required: () => Validator<string> = (errorMessage = ERROR_MESSAGE) => {
  return async (value) => (value ? null : errorMessage);
};

export default required;
