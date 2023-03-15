import {  render as rtlRender } from '@testing-library/react';
import React from 'react';
import Main from '..';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store/store';

const render = (Component) =>
  rtlRender(<Provider store={store}>
    <BrowserRouter>{Component}</BrowserRouter>
  </Provider>);

describe('Main', () => {
  it('Should render <Main>', () => {
    render(
      <Main
      />
    );
  });
});
