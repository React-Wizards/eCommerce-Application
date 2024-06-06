import type { ProductProjection } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductState {
  product: ProductProjection | null;
}

const initialState: ProductState = {
  product: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductProjection>) => {
      state.product = action.payload;
    }
  }
});

const { setProduct } = productSlice.actions;
const selectedProductReducer = productSlice.reducer;

export { setProduct, selectedProductReducer };
