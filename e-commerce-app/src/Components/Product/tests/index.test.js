import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import React from 'react';
import Product from '..';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);

describe('check working', () => {
  it('Should render <Product>', () => {
    const handler =jest.fn()
    render(
      <Product
        product={{ image: 'url', title: 'Test product', id: 1 }}
        handleAddCart={handler}
      />
    );
    fireEvent.click(screen.getByText('Add to cart'));
    expect(handler).toHaveBeenCalledTimes(1)
  });
});
