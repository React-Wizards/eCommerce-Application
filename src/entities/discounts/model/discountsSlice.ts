import type { DiscountCode } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface DiscountsState {
  discounts: DiscountCode[];
}

const initialState: DiscountsState = {
  discounts: []
};

export const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setDiscounts: (state, { payload }: PayloadAction<DiscountCode[]>): void => {
      state.discounts = payload;
    },
    addDiscount: (state, { payload }: PayloadAction<DiscountCode>): void => {
      state.discounts.push(payload);
    },
    removeDiscount: (state, { payload }: PayloadAction<DiscountCode>): void => {
      const index: number = state.discounts.findIndex(
        (discount: DiscountCode): boolean => discount.id === payload.id
      );

      if (index !== -1) {
        state.discounts.splice(index, 1);
      }
    },
    clearDiscounts: (state): void => {
      state.discounts.length = 0;
    }
  }
});

const { setDiscounts, removeDiscount, addDiscount, clearDiscounts } =
  discountsSlice.actions;
const discountsReducer = discountsSlice.reducer;

export {
  setDiscounts,
  addDiscount,
  removeDiscount,
  clearDiscounts,
  discountsReducer
};
