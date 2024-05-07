interface IScopes {
  readonly view_published_products: string;
  readonly manage_my_orders: string;
  readonly manage_my_business_units: string;
  readonly view_categories: string;
  readonly manage_my_quotes: string;
  readonly manage_my_profile: string;
  readonly manage_my_payments: string;
  readonly create_anonymous_token: string;
  readonly manage_my_shopping_lists: string;
  readonly manage_my_quote_requests: string;
}

const PROJECT_KEY: string = import.meta.env.VITE_PROJECT_KEY;
const CLIENT_SECRET: string = import.meta.env.VITE_CLIENT_SECRET;
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;
const AUTH_URL: string = import.meta.env.VITE_AUTH_URL;
const API_URL: string = import.meta.env.VITE_API_URL;
const SCOPES: IScopes = Object.freeze(
  import.meta.env.VITE_SCOPES.split(/\s/).reduce(
    (obj: IScopes, scope: string): IScopes => {
      const [key, value]: string[] = scope.split(':');

      return {
        ...obj,
        [key]: value
      };
    },
    {} as IScopes
  )
);

export default {
  PROJECT_KEY,
  CLIENT_SECRET,
  CLIENT_ID,
  AUTH_URL,
  API_URL,
  SCOPES
};
