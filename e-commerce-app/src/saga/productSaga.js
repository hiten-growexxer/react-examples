import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  getProductsSuccess,
  getProductsFailure,
  getProducts,
} from '../features/product/productSlice';

function* getProductsData() {
  try{
    const response = yield call(() =>
    axios.get('http://localhost:3004/products')
  );
  yield put(getProductsSuccess(response.data));
  } catch(err){
    yield put(getProductsFailure(err));
  }
  
}
function* productSaga() {
  yield takeEvery(getProducts, getProductsData);
}
export default productSaga;
