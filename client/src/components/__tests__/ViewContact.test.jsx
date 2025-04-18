import React from "react";
import "@testing-library/jest-dom";
import { expect, test, jest, afterEach } from "@jest/globals";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ViewContact from "../ViewContact";

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

test("should open edit for chosen contact", async () => {
  //also, any props that will impact rendering the component will need to be mocked
  const mockfindContact = [{
    contact_id: 1,
    name: "Test",
    email: "test@email.com",
    phone: "5105445414",
    notes: "test add",
    birthday: "2010-10-10",
  }];
  const mockStarSign = [{ birthday: "2010-10-10", star_sign: "Libra" }];

  //any functions we're testing in our component we need to mock
  const mockSetIsViewMoreOpen = jest.fn();

  render(
    <ViewContact
      findContact={mockfindContact}
      starSign={mockStarSign}
      selectedBirthday="2010-10-10"
      isViewMoreOpen={true}
      setIsViewMoreOpen={mockSetIsViewMoreOpen}
      starSignInfo={() => "Libra"}
    />
  );
  const button = screen.getByRole('button', {name: /edit contact/i})
  const email = screen.getByText(/email/i);

  await userEvent.click(button);

  expect(email).toBeInTheDocument();
  expect(screen.getByText("close edit")).toBeVisible();


});