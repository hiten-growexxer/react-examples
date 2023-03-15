import {  fireEvent, render as rtlRender,screen } from '@testing-library/react';
import React from 'react'
import AddTodo from '../../AddTodo';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);

describe('check working', () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }))
        });
      });
  it('Should render <AddTodo>', () => {
    render(<AddTodo/>);
    expect(screen.getByText(/item/i)).toBeTruthy();
  });

  it('Should add new todo item', () => {
    render(<AddTodo/>);
    fireEvent.change(screen.getByLabelText('item',{target:{value:'new todo'}}));
    fireEvent.click(screen.getByText('Add'));
  });
});
