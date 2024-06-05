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

const tokenStorage = new TokenStorage('ecom');

const meBaseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/me`,
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
    const tokenRefreshResult = (await api
      .dispatch(
        authApi.endpoints.refreshToken.initiate(
          decodeURIComponent(userRefreshToken)
        )
      )
      .unwrap()) as TokenResponse;
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
    })
  })
});

export const { useGetProfileMutation, useGetActiveCartMutation } = meApi;
