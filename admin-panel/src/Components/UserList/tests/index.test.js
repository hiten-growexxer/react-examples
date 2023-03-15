import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import moment from 'moment';
import UserList from '..';
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
jest.mock('axios');

describe('<UserList/>', () => {
  const mockUserData = {
    data: {
      data: {
        docs: [
          {
            _id: '123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            dateOfBirth: '1990-01-01',
            phoneNumber: '1234567890',
          },
          {
            _id: '456',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            dateOfBirth: '1995-01-01',
            phoneNumber: '0987654321',
          },
        ],
        totalDocs: 2,
      },
    },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue(mockUserData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders UserList component', async () => {
    await act(async () => {
      render(<UserList />);
    });

    expect(screen.getByText(/Name/i)).toBeTruthy();
    expect(screen.getByText(/DOB/i)).toBeTruthy();
    expect(screen.getByText(/Email/i)).toBeTruthy();
    expect(screen.getByText(/Mobile/i)).toBeTruthy();
  });

  it('opens the edit modal and updates the user data', async () => {
    const resData = {
      data: {
        data: {
          docs: [
            {
              _id: 'id123',
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@example.com',
              dateOfBirth: '2000-01-01',
              phoneNumber: '1234567890',
            },
          ],
          totalDocs: 1,
        },
      },
    };
    const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue(resData);
    const axiosPutSpy = jest.spyOn(axios, 'put').mockResolvedValue({});

    await act(async () => {
      render(<UserList />);
    });

    const editButton = screen.getByTestId('EDITBTN');
    fireEvent.click(editButton);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const dobInput = screen.getByLabelText(/DOB/i);
    const mobileInput = screen.getByLabelText(/Mobile/i);

    await waitFor(() => {
      expect(firstNameInput).toBeTruthy();
      expect(lastNameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(dobInput).toBeTruthy();
      expect(mobileInput).toBeTruthy();
    });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });

    const okButton = screen.getByTestId('okButton');
    fireEvent.click(okButton);

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).toBeTruthy();
    });

    axiosGetSpy.mockRestore();
    axiosPutSpy.mockRestore();
  });
});

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes a user when delete button is clicked and confirmed', async () => {
    const testData = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
      },
    ];

    axios.delete.mockResolvedValueOnce({
      data: { message: 'User deleted successfully' },
    });
    axios.get.mockResolvedValueOnce({
      data: { data: { docs: testData, totalDocs: 1 } },
    });

    render(<UserList />);

    await screen.findByText('John Doe');

    const deleteButton = screen.getByTestId('DELETEBTN');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('CONFIRMDEL')).toBeTruthy();
    });

    const confirmButton = screen.getByTestId('CONFIRMDEL');
    fireEvent.click(confirmButton);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:3002/user', {
      data: { id: '1' },
    });
  });

  it('cancels deleting a user when delete button is clicked and cancelled', async () => {
    const testData = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: { data: { docs: testData, totalDocs: 1 } },
    });

    render(<UserList />);

    await screen.findByText('John Doe');

    const deleteButton = screen.getByTestId('DELETEBTN');
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByTestId('cancelButton');
    fireEvent.click(cancelButton);

    expect(axios.delete).not.toHaveBeenCalled();
  });
});

// describe('UserList ', () => {
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it('updates user on form submission', async () => {
//     // Mock the axios.put function to return a successful response
//     axios.put.mockResolvedValueOnce({
//       data: { message: 'User updated successfully' },
//     });

//     // Render the component
//     render(<UserList />);

//     // Click the edit button for the first user in the table
//     const editButton = screen.getAllByRole('button', { name: 'Edit' })[0];
//     fireEvent.click(editButton);

//     // Fill in the form fields
//     const firstNameInput = screen.getByLabelText('First Name');
//     const lastNameInput = screen.getByLabelText('Last Name');
//     const emailInput = screen.getByLabelText('Email');
//     const dobInput = screen.getByLabelText('Date of Birth');
//     const mobileInput = screen.getByLabelText('Mobile');

//     fireEvent.change(firstNameInput, { target: { value: 'John' } });
//     fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
//     fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
//     fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
//     fireEvent.change(mobileInput, { target: { value: '1234567890' } });

//     // Submit the form
//     const submitButton = screen.getByRole('button', { name: 'Update' });
//     fireEvent.click(submitButton);

//     // Verify that the axios.put function was called with the correct payload
//     expect(axios.put).toHaveBeenCalledTimes(1);
//     expect(axios.put).toHaveBeenCalledWith('http://localhost:3002/user', {
//       id: expect.any(String),
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       dateOfBirth: '1990-01-01',
//       mobile: '1234567890',
//     });

//     // Wait for the success message to appear
//     const successMessage = await screen.findByText('User updated successfully');
//     expect(successMessage).toBeTruthy();
//   });

// //   it('onTableChange function should be called when table sorter is changed', async () => {
// //     const onTableChange = jest.fn();
// //     render(<UserList onTableChange={onTableChange} />);

// //     // Find the table header cell for the 'Name' column
// //     const nameHeader = screen.getByRole('columnheader', { name: /name/i });

// //     // Click the header cell to change the sorter
// //     fireEvent.click(nameHeader);

// //     // Wait for the API request to finish and state to update
// //     await screen.findByText('John Doe');

// //     // Verify that onTableChange function was called with the correct arguments
// //     expect(onTableChange).toHaveBeenCalledWith(
// //       { pageSize: 10, current: 1, total: 10 },
// //       {},
// //       { order: 'ascend' }
// //     );
// //   });
// });
