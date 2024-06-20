import email from '../../pages/RegistrationPage/lib/validators/e-mail';

describe('e-mail validator', () => {
  it('should return default error message for falsy value', async () => {
    const invalidValue = 'without-at.com';
    const result = await email()(invalidValue);

    expect(result).toBe('The e-mail address must be formatted properly');
  });

  it('should return default error message for falsy value', async () => {
    const invalidValue = 'name@domain-without-dot';
    const result = await email()(invalidValue);

    expect(result).toBe('The e-mail address must be formatted properly');
  });

  it('should return custom error message for falsy value', async () => {
    const invalidValue = 'wrong e-mail adress';
    const result = await email('Test error message')(invalidValue);

    expect(result).toBe('Test error message');
  });

  it('should return null for truthy value', async () => {
    const validValue = 'name-lastname@complex.domain.com';
    const result = await email()(validValue);

    expect(result).toBe(null);
  });
});
