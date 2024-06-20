import validateValue from '../../pages/RegistrationPage/lib/validators/index';
import required from '../../pages/RegistrationPage/lib/validators/required';
import minLength from '../../pages/RegistrationPage/lib/validators/min-length';

describe('validators applying', () => {
  it('should return first error message for first validator that fall', async () => {
    const validValue = 'too short string';
    const result = await validateValue(validValue, [required(), minLength(20)]);

    expect(result).toBe('The length cannot be less than 20');
  });

  it('should return null for truthy value', async () => {
    const validValue = 'some valid string';
    const result = await validateValue(validValue, [required(), minLength(3)]);

    expect(result).toBe(null);
  });
});
