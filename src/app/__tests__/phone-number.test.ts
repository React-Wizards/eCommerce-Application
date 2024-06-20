import phoneNumber from '../../pages/RegistrationPage/lib/validators/phone-number';

describe('phone-number validator', () => {
  it('should return default error message for to short value', async () => {
    const invalidValue = '12345';
    const result = await phoneNumber()(invalidValue);

    expect(result).toBe('The phone number must be formatted properly');
  });

  it('should return default error message for not number value', async () => {
    const invalidValue = 'not numbers';
    const result = await phoneNumber()(invalidValue);

    expect(result).toBe('The phone number must be formatted properly');
  });

  it('should return default error message for to long value', async () => {
    const invalidValue = '123456789012345';
    const result = await phoneNumber()(invalidValue);

    expect(result).toBe('The phone number must be formatted properly');
  });

  it('should return default error message for wrong formatted value', async () => {
    const invalidValue = '+1[123]456-78-90';
    const result = await phoneNumber()(invalidValue);

    expect(result).toBe('The phone number must be formatted properly');
  });

  it('should return custom error message for falsy value', async () => {
    const invalidValue = '12345';
    const result = await phoneNumber('Test error message')(invalidValue);

    expect(result).toBe('Test error message');
  });

  it('should return null for truthy value', async () => {
    const validValue = '0012345678901';
    const result = await phoneNumber()(validValue);

    expect(result).toBe(null);
  });
  it('should return null for truthy value', async () => {
    const validValue = '+1 (234) 567-89-01';
    const result = await phoneNumber()(validValue);

    expect(result).toBe(null);
  });
});
