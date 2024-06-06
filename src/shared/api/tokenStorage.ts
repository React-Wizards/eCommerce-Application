export interface CookieOptions {
  name: string;
  value: string;
  expiresIn?: number;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export default class TokenStorage {
  private prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  getItem(itemName: string) {
    return this.getCookie(`${this.prefix}_${itemName}`);
  }

  setItem(key: string, value: string, maxAge: number = 172800) {
    const options: CookieOptions = {
      name: `${this.prefix}_${key}`,
      value,
      maxAge,
      path: '/',
      domain: window.location.hostname,
      secure: false,
      httpOnly: false
    };
    this.setCookie(options);
  }

  removeItem(itemName: string) {
    this.setItem(itemName, '', -1);
  }

  clearItems() {
    document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((item) =>
        this.removeItem(item.split('=')[0].replace(`${this.prefix}_`, ''))
      );
  }

  private getCookie(name: string): string | undefined {
    const nameLenPlus = name.length + 1;
    return document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.substring(0, nameLenPlus) === `${name}=`)
      ?.split('=')[1];
  }

  private setCookie(options: CookieOptions): void {
    let cookieString = `${encodeURIComponent(options.name)}=${encodeURIComponent(options.value)};path=${options.path || '/'};`;
    if (options.maxAge) {
      cookieString += `max-age=${options.maxAge};`;
    }
    if (options.secure) cookieString += 'secure;';
    if (options.httpOnly) cookieString += 'HttpOnly;';
    document.cookie = cookieString.trim();
  }
}
