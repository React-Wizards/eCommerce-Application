import type { Cart, Customer } from '@commercetools/platform-sdk';
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import TokenStorage from '@/shared/api/tokenStorage';
import { env } from '@/shared/constants';
import { type TokenResponse, authApi } from './authApi';
import fetch from 'cross-fetch';

const tokenStorage = new TokenStorage('ecom');

const meBaseQuery = fetchBaseQuery({
  baseUrl: `${env.API_URL}/${env.PROJECT_KEY}/me`,
  prepareHeaders: async (headers) => {
    const token = tokenStorage.getItem('user-token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  fetchFn: fetch
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

  return meBaseQuery(args, api, extraOptions);
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
      query: ({ cartVersion, cartId, productId, quantity }) => {
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
                quantity
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
        lineItemQuantity?: number;
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
    }),
    addDiscountCode: builder.mutation<
      Cart,
      {
        cartId: string;
        cartVersion: number;
        code: string;
      }
    >({
      query: ({ cartVersion, cartId, code }) => {
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
                action: 'addDiscountCode',
                code
              }
            ]
          }
        };
      }
    }),
    recalculate: builder.mutation<
      Cart,
      {
        cartId: string | undefined;
        cartVersion: number | undefined;
      }
    >({
      query: ({ cartVersion, cartId }) => {
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
                action: 'recalculate'
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
  useDeleteProductFromCartMutation,
  useAddDiscountCodeMutation,
  useRecalculateMutation
} = meApi;
