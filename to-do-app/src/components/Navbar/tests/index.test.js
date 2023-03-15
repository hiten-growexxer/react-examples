import { screen, render as rtlRender, fireEvent } from '@testing-library/react';
import React from 'react'
import Navbar from '../../Navbar';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);

describe('check working', () => {
  it('Should render <Navbar>', () => {
    const { getByText } = render(<Navbar />);
    const links = getByText(/home/i);
    expect(links).toBeTruthy();
  });
  it('Should change navbar link <Navbar>', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText(/home/i)).toBeTruthy();
    const links = getByText(/view/i);
    fireEvent.click(links);
    expect(window.location.pathname).toBe('/list')
  });
});
