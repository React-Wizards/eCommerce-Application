import { configureStore } from '@reduxjs/toolkit';
import { customerReducer } from '@/entities/customer';
import { categoriesReducer } from '@/entities/category';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    categories: categoriesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
