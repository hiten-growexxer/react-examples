import React from 'react' 
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import store from '../store/store';

const render = (Component) =>
  rtlRender(
    <Provider store={store}>
      <BrowserRouter>{Component}</BrowserRouter>
    </Provider>
  );
it('Test App', () => {
  render(<App />);
});
