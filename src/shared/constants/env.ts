interface IScopes {
  readonly MANAGE_MY_SHOPPING_LISTS: string;
  readonly MANAGE_MY_QUOTE_REQUESTS: string;
  readonly MANAGE_MY_BUSINESS_UNITS: string;
  readonly MANAGE_MY_PAYMENTS: string;
  readonly MANAGE_MY_PROFILE: string;
  readonly MANAGE_MY_ORDERS: string;
  readonly MANAGE_MY_QUOTES: string;
  readonly VIEW_PUBLISHED_PRODUCTS: string;
  readonly VIEW_CATEGORIES: string;
  readonly CREATE_ANONYMOUS_TOKEN: string;
}

interface IEnv extends IScopes {
  readonly CLIENT_SECRET: string;
  readonly PROJECT_KEY: string;
  readonly CLIENT_ID: string;
  readonly AUTH_URL: string;
  readonly API_URL: string;
}

function getEnv(): IEnv {
  const scopes: IScopes = import.meta.env.VITE_SCOPES.split(/s/).reduce(
    (obj: IScopes, scope: string) => {
      const [key, value]: string[] = scope.split(':');
      return Object.assign(obj, { [key]: value });
    },
    {} as IScopes
  );

  return {
    PROJECT_KEY: import.meta.env.VITE_PROJECT_KEY,
    CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
    CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
    AUTH_URL: import.meta.env.VITE_AUTH_URL,
    API_URL: import.meta.env.VITE_API_URL,
    ...scopes
  };
}

export const env: IEnv = getEnv();
