import { ValidableField } from '@/pages/RegistrationPage/model/types';
import passwordConfirm from '../../pages/RegistrationPage/lib/validators/password-confirm';

describe('password-confirm validator', () => {
  it(`should return error message if the passwords values don't match`, async () => {
    const passwordField: ValidableField = {
      type: 'input',
      id: '1',
      value: 'password',
      error: null,
      validators: [],
      onChangeHandler: () => Promise.resolve(),
      onBlurHandler: () => Promise.resolve(),
      setValue: () => {},
      setError: () => {}
    };

    const invalidValue = '123456';

    expect(await passwordConfirm(passwordField)(invalidValue)).toBe(
      'Passwords must match'
    );
  });

  it(`should return null if the passwords values match`, async () => {
    const validValue = 'password';
    const passwordField: ValidableField = {
      type: 'input',
      id: '1',
      value: validValue,
      error: null,
      validators: [],
      onChangeHandler: () => Promise.resolve(),
      onBlurHandler: () => Promise.resolve(),
      setValue: () => {},
      setError: () => {}
    };

    expect(await passwordConfirm(passwordField)(validValue)).toBe(null);
  });
});
