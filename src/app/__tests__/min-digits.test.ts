import minDigits from '../../pages/RegistrationPage/lib/validators/min-digits';

describe('min-digits validator', () => {
  it('should return default error message for falsy value', async () => {
    const invalidValue = 'abc';
    const result = await minDigits()(invalidValue);

    expect(result).toBe('The number of digits cannot be less than 1');
  });

  it('should return default error message for string, that has length lower than minimum', async () => {
    const validValue = 'str123';
    const result = await minDigits(5)(validValue);

    expect(result).toBe('The number of digits cannot be less than 5');
  });

  it('should return null for truthy value', async () => {
    const validValue = 'some value string 12345';
    const result = await minDigits(5)(validValue);

    expect(result).toBe(null);
  });
});
