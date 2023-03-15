import {  render as rtlRender } from '@testing-library/react';
import React from 'react'
import Main from '..';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);

describe('check working', () => {
  it('Should render <Main>', () => {
    render(<Main />);
  });
});
