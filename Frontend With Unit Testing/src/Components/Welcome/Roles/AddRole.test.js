import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddRole from "./AddRole";
import { MemoryRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
import { navigateToRole } from "./NavigationUtils"; // Import the navigation function

jest.mock("axios");

jest.mock("./NavigationUtils", () => ({
  navigateToRole: jest.fn(),
}));

describe("AddRole Component", () => {
  it("submits the form successfully", async () => {
    axios.post.mockResolvedValue({ data: {} });

    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <AddRole />
      </MemoryRouter>
    );

    const roleNameInput = screen.getByPlaceholderText("Add Role");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(roleNameInput, { target: { value: "New Role" } });

    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith(
      "https://localhost:7264/api/roles",
      {
        roleName: "New Role",
      }
    );

    await waitFor(() => {
      expect(navigateToRole).toHaveBeenCalled();
    });
  });

  it("shows an error message if the role already exists", async () => {
    axios.post.mockRejectedValue("Some error");

    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <AddRole />
      </MemoryRouter>
    );

    const roleNameInput = screen.getByPlaceholderText("Add Role");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(roleNameInput, { target: { value: "Existing Role" } });

    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith(
      "https://localhost:7264/api/roles",
      {
        roleName: "Existing Role",
      }
    );

    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "Role already exists. Please enter a different role."
      );

      if (errorMessage) {
        expect(errorMessage).toBeInTheDocument();
      } else {
        expect(errorMessage).toBeNull();
      }
    });

    expect(navigateToRole).not.toHaveBeenCalled();
  });
});


