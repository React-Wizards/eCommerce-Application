import type { Customer } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CustomerState {
  user: Customer | null;
}

const initialState: CustomerState = {
  user: null
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Customer>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

const { login, logout } = customerSlice.actions;
const customerReducer = customerSlice.reducer;

export { login, logout, customerReducer };
