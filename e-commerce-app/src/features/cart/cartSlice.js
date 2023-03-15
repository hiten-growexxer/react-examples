import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalAmount: localStorage.getItem('totalAmount')
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0,
  cartQuantity: localStorage.getItem('cartQuantity')
    ? JSON.parse(localStorage.getItem('cartQuantity'))
    : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartIndex >= 0) {
        state.cartItems[cartIndex].quantity += 1;
        state.totalAmount += action.payload.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          subTotal: action.payload.price,
        });
        state.totalAmount += action.payload.price;
      }
      state.cartQuantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('cartQuantity', JSON.stringify(state.cartQuantity));
    },
    removeCartItem: (state, action) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.totalAmount = state.totalAmount - state.cartItems[cartIndex].price;
      state.cartQuantity = state.cartQuantity - 1;
      console.log(action.payload.quantity);
      if (action.payload.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cart) => cart.id !== state.cartItems[cartIndex].id
        );
      } else {
        state.cartItems[cartIndex].subTotal =
          state.cartItems[cartIndex].subTotal -
          state.cartItems[cartIndex].price;
        state.cartItems[cartIndex].quantity =
          state.cartItems[cartIndex].quantity - 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('cartQuantity', JSON.stringify(state.cartQuantity));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.cartQuantity = 0;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
      localStorage.setItem('cartQuantity', JSON.stringify(state.cartQuantity));
    },
  },
});

export default cartSlice.reducer;
export const { addCart, clearCart, removeCartItem } = cartSlice.actions;
