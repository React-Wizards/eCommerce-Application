import TokenStorage from '@/shared/api/tokenStorage';

describe('token storage', () => {
  const prefix = 'test';
  const name = 'cookie-key';
  const value = 'cookie-value';

  const tokenStorage = new TokenStorage(prefix);

  it('should get cookie', async () => {
    jest
      .spyOn(document, 'cookie', 'get')
      .mockReturnValueOnce(`${prefix}_${name}=${value};`);
    const result = tokenStorage.getItem(name);
    expect(result).toBe(value);
  });

  it('should set cookie', async () => {
    jest.spyOn(document, 'cookie', 'set');
    tokenStorage.setItem(name, value);
    expect(document.cookie).toContain(`${prefix}_${name}=${value}`);
  });

  it('should clear cookies', async () => {
    jest.spyOn(document, 'cookie', 'set');
    tokenStorage.setItem(`${name}1`, `${value}1`);
    tokenStorage.setItem(`${name}2`, `${value}2`);
    expect(document.cookie).toContain(`${prefix}_${name}1=${value}1`);
    expect(document.cookie).toContain(`${prefix}_${name}2=${value}2`);
    tokenStorage.clearItems();
    expect(document.cookie).toBe('');
  });
});
