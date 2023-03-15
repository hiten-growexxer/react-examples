import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import cartSlice from '../features/cart/cartSlice';
import productSlice from '../features/product/productSlice';
import productSaga from '../saga/productSaga';
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
  },
  middleware: [saga],
});
saga.run(productSaga);
export default store;
