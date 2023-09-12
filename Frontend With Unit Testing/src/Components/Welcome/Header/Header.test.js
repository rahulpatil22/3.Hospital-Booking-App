import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header Component", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  test("should render the Header component with correct content", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    
  });

  test("should toggle the dropdown on click", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Logout/i)).toBeNull();

    fireEvent.click(screen.getByText(/Admin/i));

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Admin/i));

    
  });

  test("should call the navigate function when home icon is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeIcon = screen.getByTestId("home-icon");

    fireEvent.click(homeIcon);

    
  });

  test("should call the navigate function when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Admin/i));

    fireEvent.click(screen.getByText(/Logout/i));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

