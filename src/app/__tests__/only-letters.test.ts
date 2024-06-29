import onlyLetters from '../../pages/RegistrationPage/lib/validators/only-letters';

describe('only-letters validator', () => {
  it('should return default error message for falsy value', async () => {
    const invalidValue = '123 abc.';
    const result = await onlyLetters()(invalidValue);

    expect(result).toBe('Must contain only letters');
  });
  it('should return null for truthy value', async () => {
    const validValue = 'onlyLettersString';
    const result = await onlyLetters()(validValue);

    expect(result).toBe(null);
  });
});
