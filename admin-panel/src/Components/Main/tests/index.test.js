import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import Main from '..';
import { BrowserRouter } from 'react-router-dom';
const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);
describe('<Main/>', () => {
  it('renders main', () => {
    render(<Main />);
  });
});
