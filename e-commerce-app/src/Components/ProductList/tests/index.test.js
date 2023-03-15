import { configureStore } from '@reduxjs/toolkit';
import { findByText, fireEvent, render as rtlRender,  screen,  waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '..';
import store from '../../../store/store';
jest.mock("axios");

const render = (Component) =>
  rtlRender(
    <Provider store={store}>
      <BrowserRouter>{Component}</BrowserRouter>
    </Provider>
  );

describe('Product listing', () => {
  it('Should render <ProductList>', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          "id": 1,
          "title": "A21",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a21-1.jpg",
          "price": 10000
      },
      {
          "id": 2,
          "title": "M21",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m21-1.jpg",
          "price": 15000
      },
      {
          "id": 3,
          "title": "Iphone 11",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-2.jpg",
          "price": 30000
      },
      {
          "id": 4,
          "title": "Iphone 12",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg",
          "price": 35000
      },
      {
          "id": 5,
          "title": "Iphone X",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
          "price": 12000
      },
      {
          "id": 6,
          "title": "Product Y",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
          "price": 1300
      },
      {
          "id": 7,
          "title": "Product Z",
          "description": "The best product for the experiment",
          "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
          "price": 1400
      }
      ]
    });
    render(<ProductList />);
    await screen.findByText('New arrivals');
    fireEvent.click(screen.getAllByText('Add to cart')[0]);
    expect(screen.getByText('Success')).toBeTruthy();
  })

  it('Should not render <ProductList>', async () => {
    axios.get.mockRejectedValueOnce(Promise.reject(new Error('something bad happened')));
    const {findByText} =await render(<ProductList />);
    expect(await findByText(/issue/i)).toBeTruthy;
  })
});
