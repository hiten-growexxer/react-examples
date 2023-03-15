import { screen, render as rtlRender, fireEvent } from '@testing-library/react';
import React from 'react';
import ListTodo from '../../ListTodo/ListTodo';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const render = (Component) =>
  rtlRender(<BrowserRouter>{Component}</BrowserRouter>);

describe('check working', () => {
  it('Should render <ListTodo>', () => {
    const { getByText } = render(<ListTodo todo={['str']} />);
  });
  it('Should change ListTodo link <ListTodo>', () => {
    const { getByText } = render(
      <ListTodo todo={['str']} setTodo={() => jest.fn()} />
    );
    fireEvent.click(getByText('Delete'));
    fireEvent.blur(getByText('str'));
  });
  it('Should change ListTodo link <ListTodo>', () => {
    const { getByText } = render(
      <Todo
        desc="str"
        onDeleteHandler={() => jest.fn()}
        handleEdit={(e) => jest.fn('test', 'test')}
        setTodo={() => jest.fn()}
      />
    );
    fireEvent.click(getByText('Delete'));
  });
});

// [
//     'str', -> Todo
//     'who'
// ]
