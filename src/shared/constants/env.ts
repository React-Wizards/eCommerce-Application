interface IScopes {
  readonly CREATE_ANONYMOUS_TOKEN: string;
  readonly MANAGE_CUSTOMERS: string;
  readonly MANAGE_MY_SHOPPING_LISTS: string;
  readonly MANAGE_MY_QUOTE_REQUESTS: string;
  readonly MANAGE_MY_BUSINESS_UNITS: string;
  readonly MANAGE_MY_PAYMENTS: string;
  readonly MANAGE_MY_PROFILE: string;
  readonly MANAGE_MY_ORDERS: string;
  readonly MANAGE_MY_QUOTES: string;
  readonly VIEW_PUBLISHED_PRODUCTS: string;
  readonly VIEW_PRODUCT_SELECTIONS: string;
  readonly VIEW_STANDALONE_PRICES: string;
  readonly VIEW_SHIPPING_METHODS: string;
  readonly VIEW_DISCOUNT_CODES: string;
  readonly VIEW_SHOPPING_LISTS: string;
  readonly VIEW_TAX_CATEGORIES: string;
  readonly VIEW_CART_DISCOUNTS: string;
  readonly VIEW_QUOTE_REQUESTS: string;
  readonly VIEW_STAGED_QUOTES: string;
  readonly VIEW_ORDER_EDITS: string;
  readonly VIEW_CATEGORIES: string;
  readonly VIEW_PAYMENTS: string;
  readonly VIEW_MESSAGES: string;
  readonly VIEW_STATES: string;
  readonly VIEW_QUOTES: string;
  readonly VIEW_STORES: string;
  readonly VIEW_ORDERS: string;
  readonly VIEW_TYPES: string;
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
