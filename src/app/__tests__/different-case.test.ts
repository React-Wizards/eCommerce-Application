import differentCase from '../../pages/RegistrationPage/lib/validators/different-case';

describe('different-case validator', () => {
  it('should return default error message for falsy value', async () => {
    const invalidValue = 'string in only lower case';
    const result = await differentCase()(invalidValue);

    expect(result).toBe('Must contain uppercase and lowercase letters');
  });

  it('should return default error message for falsy value', async () => {
    const invalidValue = 'STRING IN ONLY UPPER CASE';
    const result = await differentCase()(invalidValue);

    expect(result).toBe('Must contain uppercase and lowercase letters');
  });

  it('should return custom error message for falsy value', async () => {
    const invalidValue = 'string in only lower case';
    const result = await differentCase('Test error message')(invalidValue);

    expect(result).toBe('Test error message');
  });

  it('should return null for truthy value', async () => {
    const validValue = 'srting IN different CASE';
    const result = await differentCase()(validValue);

    expect(result).toBe(null);
  });
});
