import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import UserPage from "./UserPage";
import "@testing-library/jest-dom/extend-expect"; 

jest.mock("axios");

 describe("UserPage", () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(() => "mocked-jwt-token"),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders user data when data is available", async () => {
    const mockUsers = [
      {
        userId: 1,
        name: "User 1",
        email: "user1@example.com",
        mobileNumber: "1234567890",
        role: { roleName: "Admin" },
      },
    ];

    axios.get.mockResolvedValue({ data: mockUsers });

    render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );

    await screen.findByTestId("name-1");

    expect(screen.getByTestId("name-1")).toBeInTheDocument();
    expect(screen.getByTestId("email-1")).toBeInTheDocument();
    expect(screen.getByTestId("mobileNumber-1")).toBeInTheDocument();
    expect(screen.getByTestId("role-1")).toBeInTheDocument();

    expect(screen.getByTestId("name-1")).toHaveTextContent("User 1");
    expect(screen.getByTestId("email-1")).toHaveTextContent(
      "user1@example.com"
    );
    expect(screen.getByTestId("mobileNumber-1")).toHaveTextContent(
      "1234567890"
    );
    expect(screen.getByTestId("role-1")).toHaveTextContent("Admin");
  });

  it('renders "No data available" when no data is available', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );

    await screen.findByText("No data available");

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  jest.mock("axios", () => ({
    delete: jest.fn(() => Promise.resolve()),
  }));

  it("calls deleteUser function when delete button is clicked", async () => {
    const mockUsers = [
      {
        userId: 1,
        name: "User 1",
        email: "user1@example.com",
        mobileNumber: "1234567890",
        role: { roleName: "Admin" },
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("User 1")).toBeInTheDocument();
    });

    axios.delete.mockResolvedValueOnce({});

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "https://localhost:7264/api/users/1"
      );
    });
  });
});
