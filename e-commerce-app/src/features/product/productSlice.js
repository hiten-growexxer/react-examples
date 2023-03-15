import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  products: [],
  error:false
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state) => {
      state.isLoading = true;
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductsFailure: (state) => {
      state.isLoading = false;
      state.error=true;
    },
  },
});

export default productSlice.reducer;
export const { getProducts, getProductsSuccess, getProductsFailure } =
  productSlice.actions;
