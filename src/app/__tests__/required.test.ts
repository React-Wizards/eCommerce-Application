import required from '../../pages/registration-page/lib/validators/required';

describe('required validator', () => {
  it('should return default error message for falsy value', async () => {
    const invalidValue = '';
    const result = await required()(invalidValue);

    expect(result).toBe('The field is required');
  });
  it('should return null for truthy value', async () => {
    const validValue = 'some value string';
    const result = await required()(validValue);

    expect(result).toBe(null);
  });
});
