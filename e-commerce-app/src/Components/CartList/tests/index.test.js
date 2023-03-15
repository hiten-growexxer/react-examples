import { fireEvent, render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CartList from '..';
import { addCart } from '../../../features/cart/cartSlice';
import store from '../../../store/store';
const render = (Component) =>
  rtlRender(
    <Provider store={store}>
      <BrowserRouter>{Component}</BrowserRouter>
    </Provider>
  );

describe('Cart listing', () => {
  it('Should render <CartList>', () => {
    render(<CartList />);
  })

  it('Should render <CartList> with cart item', async() => {
    store.dispatch(addCart({id:'test id',
    image:'test image',
    price:'test price',
    description:'test description',
    quantity:'test quantity'}));
    const {getByText} = render(<CartList />);
    fireEvent.click(getByText('+'))
    fireEvent.click(getByText('-'))
    fireEvent.click(getByText('Clear cart'))
    expect(getByText('Your cart is empty.')).toBeTruthy()
  })
});
