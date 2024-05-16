import { Validator } from '../../model/types';

type StringOrNull = string | null;

const validateValue = async <T>(
  value: T,
  validators: Array<Validator<T>>
): Promise<StringOrNull> => {
  let validationResult: StringOrNull = null;

  await Promise.allSettled(
    validators.map((validator) => validator(value))
  ).then((results) => {
    results.some((result, index) => {
      if (result.status == 'fulfilled' && result.value) {
        validationResult = result.value;
        return true;
      }
      if (result.status == 'rejected') {
        console.error(`${validators[index].name}: ${result.reason}`);
      }
    });
  });

  return validationResult;
};

export default validateValue;
