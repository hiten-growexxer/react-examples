import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUser from '..';
import axios from 'axios';
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('AddUser component', () => {
  it('should render all form fields', () => {
    render(<AddUser />);
    expect(screen.getByLabelText(/First Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/Last Name/i)).toBeTruthy();
    expect(screen.getByLabelText(/DOB/i)).toBeTruthy();
    expect(screen.getByLabelText(/Email/i)).toBeTruthy();
    expect(screen.getByLabelText(/Mobile/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeTruthy();
  });

  it('should show error message for required fields when submitted with empty values', async () => {
    render(<AddUser />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/This field is required/i)).toBeTruthy();
    });
  });

  it('should submit form successfully with valid input values', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { message: 'User added successfully' },
    });
    render(<AddUser />);
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/DOB/i), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: '1234567890' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await screen.findByText(/User added successfully/i);
  });
});
