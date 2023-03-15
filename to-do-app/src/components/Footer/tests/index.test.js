import {  render as rtlRender } from '@testing-library/react';
import React from 'react'
import Footer from '../../Footer';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);

describe('check working', () => {
  it('Should render <Footer>', () => {
    const { getByText } = render(<Footer/>);
    expect(getByText(/footer/i)).toBeTruthy();
  });
});
