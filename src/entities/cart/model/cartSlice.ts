import { Cart } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  cart: Cart | null;
}

const initialState: CartState = {
  cart: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    }
  }
});

const { setCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { setCart, cartReducer };
