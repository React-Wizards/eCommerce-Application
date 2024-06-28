import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appApi } from '@/features/api/appApi';
import { authApi } from '@/features/api/authApi';
import { meApi } from '@/features/api/meApi';
import { customerReducer } from '@/entities/customer';
import { productsReducer, productsViewReducer } from '@/entities/product';
import { categoriesReducer } from '@/entities/category';
import { cartReducer } from '@/entities/cart';
import { selectedProductReducer } from '@/entities/selectedProduct';
import { discountsReducer } from '@/entities/discounts';

const rootReducer = combineReducers({
  customer: customerReducer,
  categories: categoriesReducer,
  products: productsReducer,
  productsView: productsViewReducer,
  selectedProduct: selectedProductReducer,
  cart: cartReducer,
  discounts: discountsReducer,
  [appApi.reducerPath]: appApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [meApi.reducerPath]: meApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      appApi.middleware,
      authApi.middleware,
      meApi.middleware
    )
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      appApi.middleware,
      authApi.middleware,
      meApi.middleware
    )
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppSelector = useSelector.withTypes<RootState>();
export const AppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppSelector = useSelector.withTypes<RootState>();
