import { ValidableField } from '@/pages/RegistrationPage/model/types';
import postCode from '../../pages/RegistrationPage/lib/validators/post-code';

describe('post-code validator', () => {
  ['Belarus', 'Germany', 'Kazakhstan', 'Russia'].forEach((country) => {
    it(`should return error message for too short value or too long values for country ${country}, and null for correct value`, async () => {
      const countryField: ValidableField = {
        type: 'input',
        id: '1',
        value: country,
        error: null,
        validators: [],
        onChangeHandler: () => Promise.resolve(),
        onBlurHandler: () => Promise.resolve(),
        setValue: () => {},
        setError: () => {}
      };

      const invalidValueTooShort = '12345';
      const invalidValueTooLong = '1234567';
      const validValue = '123456';

      expect(await postCode(countryField)(invalidValueTooShort)).toBe(
        'Post code must be formatted properly'
      );
      expect(await postCode(countryField)(invalidValueTooLong)).toBe(
        'Post code must be formatted properly'
      );
      expect(await postCode(countryField)(validValue)).toBe(null);
      expect(await postCode()('')).toBe(null);
    });
  });

  it('should return error message for too short value or too long values for country USA, and null for correct value', async () => {
    const countryField: ValidableField = {
      type: 'input',
      id: '1',
      value: 'USA',
      error: null,
      validators: [],
      onChangeHandler: () => Promise.resolve(),
      onBlurHandler: () => Promise.resolve(),
      setValue: () => {},
      setError: () => {}
    };

    const invalidValueTooShort = '1234';
    const invalidValueTooLong = '1234567890';
    const validValue1 = '12345';
    const validValue2 = '12345-6789';

    expect(await postCode(countryField)(invalidValueTooShort)).toBe(
      'Post code must be formatted properly'
    );
    expect(await postCode(countryField)(invalidValueTooLong)).toBe(
      'Post code must be formatted properly'
    );
    expect(await postCode(countryField)(validValue1)).toBe(null);
    expect(await postCode(countryField)(validValue2)).toBe(null);
  });
});
