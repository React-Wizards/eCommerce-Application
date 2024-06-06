import { env } from '@/shared/constants';
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
    baseUrl: `${env.AUTH_URL}`,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Basic ${btoa(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`)}`
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
          url: `/oauth/${env.PROJECT_KEY}/customers/token`,
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
        url: `/oauth/${env.PROJECT_KEY}/anonymous/token`,
        method: 'POST',
        params: {
          grant_type: 'client_credentials',
          scope: `view_published_products:${env.PROJECT_KEY} manage_my_orders:${env.PROJECT_KEY} manage_my_profile:${env.PROJECT_KEY}`
        }
      })
    })
  })
});

export const { useRootTokenMutation, useMeTokenMutation } = authApi;
