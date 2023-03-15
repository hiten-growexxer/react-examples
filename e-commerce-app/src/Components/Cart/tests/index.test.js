import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import React from 'react';
import Cart from '..';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  rtlRender(
    <BrowserRouter>{Component}</BrowserRouter>
  )
describe('check working', () => {
  it('Should render <Cart>', () => {
    const handler =jest.fn()
    render(
      <Cart
        product={{title:'test title',
        id:'test id',
        image:'test image',
        price:'test price',
        description:'test description',
        quantity:'test quantity'}}
        handleCartReduce={handler}
        handleCartIncrease={handler}
      />
    );
    fireEvent.click(screen.getByText('-'));
    expect(handler).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByText('+'));
    expect(handler).toHaveBeenCalledTimes(2)
  });
});
