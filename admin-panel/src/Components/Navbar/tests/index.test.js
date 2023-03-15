import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Navbar from '..';
import { MemoryRouter } from 'react-router-dom';

describe('<Navbar/>', () => {
  it('renders three menu items', () => {
    const { getByText } = render(<Navbar collapsed={false} />, {
      wrapper: MemoryRouter,
    });
    const userMenuItem = screen.getAllByText(/User/);
    const addUserMenuItem = getByText(/Add User/);
    const getLocationMenuItem = getByText(/Get location/);
    expect(userMenuItem).toBeTruthy();
    expect(addUserMenuItem).toBeTruthy();
    expect(getLocationMenuItem).toBeTruthy();
  });

  it('navigates to the correct route on menu item click', async () => {
    const { getByText } = render(<Navbar collapsed={false} />, {
      wrapper: MemoryRouter,
    });
    const addUserMenuItem = getByText(/Get location/);
    fireEvent.click(addUserMenuItem);
    expect(window.location.pathname).toBe('/');
  });
});
