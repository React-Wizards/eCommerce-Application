import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
  refresh_token?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_AUTH_URL}`,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        'Basic ' +
          btoa(
            import.meta.env.VITE_CLIENT_ID +
              ':' +
              import.meta.env.VITE_CLIENT_SECRET
          )
      );
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    rootToken: builder.mutation<TokenResponse, void>({
      query: () => ({
        url: '/oauth/token',
        method: 'POST',
        params: {
          grant_type: 'client_credentials'
        }
      })
    }),
    meToken: builder.mutation<TokenResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: `/oauth/${import.meta.env.VITE_PROJECT_KEY}/customers/token`,
          method: 'POST',
          params: {
            grant_type: 'password',
            username: credentials.username,
            password: credentials.password
          }
        };
      }
    }),
    refreshToken: builder.mutation<TokenResponse, string>({
      query: (token: string) => ({
        url: `/oauth/token`,
        method: 'POST',
        params: {
          grant_type: 'refresh_token',
          refresh_token: token
        }
      })
    }),
    anonymousToken: builder.mutation<TokenResponse, void>({
      query: () => ({
        url: `/oauth/${import.meta.env.VITE_PROJECT_KEY}/anonymous/token`,
        method: 'POST',
        params: {
          grant_type: 'client_credentials',
          scope: `view_published_products:${import.meta.env.VITE_PROJECT_KEY} manage_my_orders:${import.meta.env.VITE_PROJECT_KEY} manage_my_profile:${import.meta.env.VITE_PROJECT_KEY}`
          // anonymous_id={uniqueId}"
        }
      })
    })
  })
});

export const { useRootTokenMutation, useMeTokenMutation } = authApi;
