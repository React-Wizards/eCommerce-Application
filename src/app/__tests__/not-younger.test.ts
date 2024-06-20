import notYounger, {
  DEFAULT_MIN_AGE
} from '../../pages/RegistrationPage/lib/validators/not-younger';

const MILLIS_IN_YEAR = 1000 * 60 * 60 * 24 * 365.2425;

describe('not-younger validator', () => {
  it('should return default error message for falsy value with default minimal age', async () => {
    const invalidDate = new Date(Date.now() - 15 * MILLIS_IN_YEAR);
    const invalidValue = `${invalidDate.getFullYear()}-${String(invalidDate.getMonth()).padStart(2, '0')}-${invalidDate.getDate()}`;

    const result = await notYounger()(invalidValue);

    expect(result).toBe(`The age must be above than ${DEFAULT_MIN_AGE}`);
  });

  it('should return default error message for age, that less than given minimal age', async () => {
    const minimalAge = 3;
    const invalidDate = new Date(Date.now() - 2 * MILLIS_IN_YEAR);
    const invalidValue = `${invalidDate.getFullYear()}-${String(invalidDate.getMonth()).padStart(2, '0')}-${invalidDate.getDate()}`;

    const result = await notYounger(minimalAge)(invalidValue);

    expect(result).toBe(`The age must be above than ${minimalAge}`);
  });

  it('should return null for truthy value', async () => {
    const minimalAge = 3;
    const validDate = new Date(Date.now() - 4 * MILLIS_IN_YEAR);
    const validValue = `${validDate.getFullYear()}-${String(validDate.getMonth()).padStart(2, '0')}-${validDate.getDate()}`;

    const result = await notYounger(minimalAge)(validValue);

    expect(result).toBe(null);
  });

  it('should thow error if option is not valid', async () => {
    const testCallback = () => {
      notYounger(-1);
    };
    expect(testCallback).toThrow(
      'Validator notYounger expect positive min age, but got: -1'
    );
  });
});
