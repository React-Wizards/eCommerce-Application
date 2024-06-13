import type {
  Category,
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
import { defaultLocale } from '@/shared/constants/settings';
import { SizesType } from '@/entities/product/model/productsViewSlice';

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
        searchText?: string;
        priceRange?: { min: number; max: number };
        sizes?: SizesType;
      }
    >({
      query: ({
        categoryId,
        pageSize = 1,
        currentPage = 1,
        sortOption,
        searchText,
        priceRange,
        sizes
      }) => {
        const result: FetchArgs = {
          url: `/product-projections/search?limit=${pageSize}`,
          method: 'GET',
          params: {
            offset: (currentPage - 1) * pageSize,
            sort: sortOption
          }
        };

        if (categoryId) {
          result.url +=
            '&filter=' + encodeURIComponent(`categories.id:"${categoryId}"`);
        }

        if (priceRange) {
          result.url += `&filter=variants.price.centAmount%3Arange+%28${priceRange.min * 100}+to+${priceRange.max * 100}%29`;
        }

        if (sizes) {
          const selectedSizes = [];
          for (const size in sizes) {
            if (sizes[size as keyof SizesType]) {
              selectedSizes.push(`"${size}"`);
            }
          }
          result.url +=
            '&filter=' +
            encodeURIComponent(
              `variants.attributes.size.key:${selectedSizes.join(',')}`
            );
        }
        const searchStrParamName: string = `text.${defaultLocale}`;
        if (searchText && result.params) {
          result.params[searchStrParamName] = `"${searchText || ''}"`;
          result.params['fuzzy'] = true;
          result.params['fuzzyLevel'] = 1;
        }
        return result;
      }
    }),
    getCategories: builder.mutation<CategoryPagedQueryResponse, void>({
      query: () => {
        return { url: '/categories', method: 'GET' };
      }
    }),
    getCategoryById: builder.mutation<Category, string>({
      query: (categoryId) => {
        return { url: `/categories/${categoryId}`, method: 'GET' };
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
  useGetCategoryByIdMutation,
  useGetDiscountByIdMutation,
  useGetDiscountByKeyMutation
} = appApi;
