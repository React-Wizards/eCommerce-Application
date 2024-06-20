import minLength from '../../pages/RegistrationPage/lib/validators/min-length';

describe('min-length validator', () => {
  it('should return default error message for falsy value', async () => {
    const invalidValue = '';
    const result = await minLength()(invalidValue);

    expect(result).toBe('The length cannot be less than 1');
  });

  it('should return default error message for string, that has length lower than minimum', async () => {
    const validValue = 'str';
    const result = await minLength(5)(validValue);

    expect(result).toBe('The length cannot be less than 5');
  });

  it('should return null for truthy value', async () => {
    const validValue = 'some value string';
    const result = await minLength()(validValue);

    expect(result).toBe(null);
  });

  it('should thow error if option is not valid', async () => {
    const testCallback = () => {
      minLength(-1);
    };
    expect(testCallback).toThrow(
      'Validator minLength expect positive min length, but got: -1'
    );
  });
});
