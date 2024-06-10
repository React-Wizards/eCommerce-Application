import type { ProductProjection } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
  products: ProductProjection[];
}

const initialState: ProductState = {
  products: []
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductProjection[]>) => {
      state.products = action.payload;
    }
  }
});

const { setProducts } = productSlice.actions;
const productsReducer = productSlice.reducer;

export { setProducts, productsReducer };
