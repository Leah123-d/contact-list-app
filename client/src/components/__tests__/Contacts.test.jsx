import React from 'react';
import '@testing-library/jest-dom'
import {expect, test, jest, afterEach} from '@jest/globals'
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateContact from '../CreateContact';

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

test('test create contact calls create contact function', async () => {
  //setting up mock data 

  const mockCreateContact = jest.fn();

  render(<CreateContact createNewContact={mockCreateContact}/>);

  //mocking the user completing the form
  await userEvent.type(screen.getByLabelText(/Contact name/i), "Test");
  await userEvent.type(screen.getByLabelText(/Contact email/i), "test@email.com");
  await userEvent.type(screen.getByLabelText(/Contact phone/i), "5105445414");
  await userEvent.type(screen.getByLabelText(/Notes/i), "test add");
  await userEvent.type(screen.getByLabelText(/Birthday/i), "2010-10-10");

  await userEvent.click(screen.getByRole('button', {name: /Create contact/i}))

  expect(mockCreateContact).toHaveBeenCalledWith({name: "Test", email: "test@email.com", phone: "5105445414" , notes: "test add", birthday: "2010-10-10"});
  expect(mockCreateContact).toHaveBeenCalledTimes(1);
})

