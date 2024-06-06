import {
  CategoryPagedQueryResponse,
  DiscountCodePagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse
} from '@commercetools/platform-sdk';
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

const appBaseQuery = fetchBaseQuery({
  baseUrl: `${env.API_URL}/${env.PROJECT_KEY}`,
  prepareHeaders: async (headers) => {
    const token = tokenStorage.getItem('app-token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const appBaseQueryWithPreauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const appToken = tokenStorage.getItem('app-token');
  if (!appToken) {
    const tokenRequestResult: TokenResponse = await api
      .dispatch(authApi.endpoints.rootToken.initiate())
      .unwrap();
    tokenStorage.setItem(
      'app-token',
      tokenRequestResult.access_token,
      tokenRequestResult.expires_in
    );
  }
  let result = await appBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const tokenRequestResult: TokenResponse = await api
      .dispatch(authApi.endpoints.rootToken.initiate())
      .unwrap();
    tokenStorage.setItem(
      'app-token',
      tokenRequestResult.access_token,
      tokenRequestResult.expires_in
    );
  }
  result = await appBaseQuery(args, api, extraOptions);
  return result;
};

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: appBaseQueryWithPreauth,
  endpoints: (builder) => ({
    getProductById: builder.mutation<ProductProjection, string>({
      query: (productId) => `/product-projections/${productId}`
    }),
    getProductByKey: builder.mutation<ProductProjection, string>({
      query: (productKey) => `/product-projections/key=${productKey}`
    }),
    getProductsByCategoryId: builder.mutation<
      ProductProjectionPagedQueryResponse,
      {
        categoryId: string;
        pageSize?: number;
        currentPage?: number;
        sortOption: string;
      }
    >({
      query: ({ categoryId, pageSize = 1, currentPage = 1, sortOption }) => {
        return {
          url: `/product-projections/search`,
          method: 'POST',
          params: {
            filter: `categories.id:"${categoryId}"`,
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            sort: sortOption
          }
        };
      }
    }),
    getCategories: builder.mutation<CategoryPagedQueryResponse, void>({
      query: () => {
        return { url: '/categories', method: 'GET' };
      }
    }),
    getDiscounts: builder.mutation<DiscountCodePagedQueryResponse, void>({
      query: () => {
        return { url: '/product-discounts', method: 'GET' };
      }
    }),
    getDiscountById: builder.mutation<DiscountCodePagedQueryResponse, string>({
      query: (discountId) => {
        return { url: `product-discounts/${discountId}`, method: 'GET' };
      }
    }),
    getDiscountByKey: builder.mutation<DiscountCodePagedQueryResponse, string>({
      query: (productKey) => {
        return { url: `product-discounts/key=${productKey}`, method: 'GET' };
      }
    })
  })
});

export const {
  useGetProductByKeyMutation,
  useGetProductByIdMutation,
  useGetProductsByCategoryIdMutation,
  useGetCategoriesMutation,
  useGetDiscountByIdMutation,
  useGetDiscountByKeyMutation
} = appApi;