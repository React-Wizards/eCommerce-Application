import { defaultLocale } from '@/shared/constants/settings';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductsViewState {
  currentPage: number;
  pageSize: number;
  totalItemsCount: number;
  selectedCategoryId: string;
  sortOption: string;
}

const initialState: ProductsViewState = {
  currentPage: 1,
  pageSize: 9,
  totalItemsCount: 0,
  selectedCategoryId: '',
  sortOption: `name.${defaultLocale} asc`
};

export const productsViewSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalItemsCount: (state, action: PayloadAction<number>) => {
      state.totalItemsCount = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    }
  }
});

const {
  setCurrentPage,
  setTotalItemsCount,
  setSelectedCategoryId,
  setSortOption
} = productsViewSlice.actions;
const productsViewReducer = productsViewSlice.reducer;

export {
  setCurrentPage,
  setTotalItemsCount,
  setSelectedCategoryId,
  setSortOption,
  productsViewReducer
};
