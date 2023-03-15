import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MyHeader from '..';

describe('<MyHeader/>', () => {
  it('renders MyHeader component', () => {
    const setCollapsedHandler = jest.fn();
    const { getByTestId } = render(
      <MyHeader collapsed={false} setCollapsedHandler={setCollapsedHandler} />
    );

    expect(getByTestId('MyHeader')).toBeTruthy();
  });

  it('calls setCollapsedHandler when button is clicked', () => {
    const setCollapsedHandler = jest.fn();
    const { getByRole } = render(
      <MyHeader collapsed={false} setCollapsedHandler={setCollapsedHandler} />
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(setCollapsedHandler).toHaveBeenCalled();
  });
});
