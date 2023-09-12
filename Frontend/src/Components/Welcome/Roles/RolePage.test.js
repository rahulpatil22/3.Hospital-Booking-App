import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios"; 
import RolePage from "./RolePage";
import { MemoryRouter } from "react-router-dom";

// Mock axios get and delete methods
jest.mock("axios");

describe("RolePage Component", () => {
  // Mock roles data for testing
  const mockRoles = [
    { roleId: 1, roleName: "Admin" },
    { roleId: 2, roleName: "User" },
  ];

  // Mock the localStorage.getItem method
  const localStorageMock = {
    getItem: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  // Test case for rendering component with roles
  it("renders roles when roles are available", async () => {
    localStorageMock.getItem.mockReturnValue("fakeToken"); // Mock token
    axios.get.mockResolvedValue({ data: mockRoles }); // Mock axios response

    render(
      <MemoryRouter>
        <RolePage />
      </MemoryRouter>
    );

    // Check for specific content within the rendered component
    const addButton = screen.getByText("Add Role");

    expect(addButton).toBeInTheDocument();
  });

  // Test case for rendering "No data available" when no roles
  it("renders 'No data available' when no roles are available", async () => {
    localStorageMock.getItem.mockReturnValue("fakeToken");
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <RolePage />
      </MemoryRouter>
    );

    const noDataElement = await screen.findByText("No data available");
    expect(noDataElement).toBeInTheDocument();
  });

  // Test case for deleting a role
  it("deletes a role when the delete button is clicked", async () => {
    localStorageMock.getItem.mockReturnValue("fakeToken");
    axios.get.mockResolvedValue({ data: mockRoles });
    axios.delete.mockResolvedValue({});

    render(
      <MemoryRouter>
        <RolePage />
      </MemoryRouter>
    );

    const deleteButton = await screen.findAllByText("Delete");
    fireEvent.click(deleteButton[0]);

    expect(axios.delete).toHaveBeenCalledWith(
      "https://localhost:7264/api/roles/1",
      expect.any(Object)
    );
  });
});
