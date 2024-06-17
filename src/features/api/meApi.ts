import { Cart, Customer } from '@commercetools/platform-sdk';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import TokenStorage from '@/shared/api/tokenStorage';
import { TokenResponse, authApi } from './authApi';
import { env } from '@/shared/constants';

const tokenStorage = new TokenStorage('ecom');

const meBaseQuery = fetchBaseQuery({
  baseUrl: `${env.API_URL}/${env.PROJECT_KEY}/me`,
  prepareHeaders: async (headers) => {
    const token = tokenStorage.getItem('user-token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const meBaseQueryWithPreauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const userToken = tokenStorage.getItem('user-token');
  const userRefreshToken = tokenStorage.getItem('user-refresh-token');

  if (!userToken && userRefreshToken) {
    const tokenRefreshResult: TokenResponse = await api
      .dispatch(
        authApi.endpoints.refreshToken.initiate(
          decodeURIComponent(userRefreshToken)
        )
      )
      .unwrap();
    tokenStorage.setItem(
      'user-token',
      tokenRefreshResult.access_token,
      tokenRefreshResult.expires_in
    );
  }

  return await meBaseQuery(args, api, extraOptions);
};

export const meApi = createApi({
  reducerPath: 'meApi',
  baseQuery: meBaseQueryWithPreauth,
  endpoints: (builder) => ({
    getProfile: builder.mutation<Customer, void>({
      query: () => {
        return { url: '', method: 'GET' };
      }
    }),
    getActiveCart: builder.mutation<Cart, void>({
      query: () => {
        return { url: '/active-cart', method: 'GET' };
      }
    }),
    createActiveCart: builder.mutation<Cart, void>({
      query: () => {
        return {
          url: '/carts',
          method: 'POST',
          body: {
            currency: 'USD'
          }
        };
      }
    }),
    addProductToCart: builder.mutation<
      Cart,
      {
        cartId: string | undefined;
        cartVersion: number | undefined;
        productId: string;
        quantity: number;
      }
    >({
      query: ({ cartVersion, cartId, productId }) => {
        return {
          url: `/carts/${cartId}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            version: cartVersion,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId: 1,
                quantity: 1
              }
            ]
          }
        };
      }
    }),
    deleteProductFromCart: builder.mutation<
      Cart,
      {
        cartId: string;
        cartVersion: number;
        lineItemId: string;
        lineItemQuantity: number;
      }
    >({
      query: ({ cartVersion, cartId, lineItemId, lineItemQuantity }) => {
        return {
          url: `/carts/${cartId}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            version: cartVersion,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId,
                variantId: 1,
                quantity: lineItemQuantity
              }
            ]
          }
        };
      }
    })
  })
});

export const {
  useGetProfileMutation,
  useGetActiveCartMutation,
  useCreateActiveCartMutation,
  useAddProductToCartMutation,
  useDeleteProductFromCartMutation
} = meApi;
