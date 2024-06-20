import type { Category } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CategoriesState {
  categories: Array<Category>;
}

const initialState: CategoriesState = {
  categories: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Array<Category>>) => {
      state.categories = action.payload;
    }
  }
});

const { setCategories } = categoriesSlice.actions;
const categoriesReducer = categoriesSlice.reducer;

export { setCategories, categoriesReducer };
