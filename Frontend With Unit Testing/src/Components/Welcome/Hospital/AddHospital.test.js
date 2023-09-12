import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import axios from "axios";

import AddHospital from "./AddHospital"; // Update the import path accordingly

import { MemoryRouter } from "react-router-dom";

import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

// Mocking axios to prevent actual API calls during testing

jest.mock("axios");

// Mocking useNavigate

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useNavigate: jest.fn(),
}));

describe("AddHospital Component", () => {
  test("renders the form and submits successfully", async () => {
    // Mock the axios post request response

    axios.post.mockResolvedValueOnce({ data: { message: "Success" } });

    const mockNavigate = jest.fn();

    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AddHospital />
      </MemoryRouter>
    );

    // Simulate user interactions...

    userEvent.type(
      screen.getByPlaceholderText("Hospital's Name"),
      "Test Hospital"
    );

    userEvent.type(
      screen.getByPlaceholderText("Address of Hospital"),
      "Test Address"
    );

    // Simulate form submission

    userEvent.click(screen.getByText("Submit"));

    // Wait for axios post to be called

    await screen.findByTestId("success-message");

    // Verify the success message element

    expect(screen.getByTestId("success-message")).toBeInTheDocument();

    // Ensure the navigation occurred using the mockNavigate function

    expect(mockNavigate).toHaveBeenCalledWith("/hospital");
  });

  test("navigates to the /hospital route when Back button is clicked", () => {
    const mockNavigate = jest.fn();

    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AddHospital />
      </MemoryRouter>
    );

    // Simulate user interaction...

    fireEvent.click(screen.getByText("Back"));

    // Ensure navigation occurred

    expect(mockNavigate).toHaveBeenCalledWith("/hospital");
  });
});
