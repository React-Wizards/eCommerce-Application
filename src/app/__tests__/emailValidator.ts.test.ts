import { emailValidator } from '@/features/Validation';

describe('emailValidator', () => {
  it('should return error message for falsy value', async () => {
    const invalidValue = 'without-at.com';
    const result = await emailValidator(invalidValue);

    expect(result).toStrictEqual({
      result: false,
      message: 'Email address is not properly formatted, e.g. user@gmail.com'
    });
  });

  it('should return error message for falsy value', async () => {
    const invalidValue = 'name@domain-without-dot';
    const result = await emailValidator(invalidValue);

    expect(result).toStrictEqual({
      result: false,
      message: 'Email address is not properly formatted, e.g. user@gmail.com'
    });
  });

  it('should return null for truthy value', async () => {
    const validValue = 'name-lastname@complex.domain.com';
    const result = await emailValidator(validValue);

    expect(result).toStrictEqual({
      result: true,
      message: ''
    });
  });
});
