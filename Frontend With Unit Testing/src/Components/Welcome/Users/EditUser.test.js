import React from "react";
import { render, fireEvent, screen, waitFor, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import EditUser from "./EditUser"; 
import { MemoryRouter } from "react-router-dom";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock axios
jest.mock("axios");

describe("EditUser Component", () => {
  beforeEach(() => {
    // Reset mock axios implementations before each test
    jest.clearAllMocks();

    // Mock the axios get method for roles and users fetch
    axios.get.mockResolvedValue({ data: [] });
  });

  it("should render input fields with initial values", () => {
    render(<MemoryRouter><EditUser /></MemoryRouter>);

    expect(screen.getByPlaceholderText("Full Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Email")).toHaveValue("");
    expect(screen.getByPlaceholderText("Mobile Number")).toHaveValue("");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("");
  });


  it("should update name field on change", () => {
    render(<MemoryRouter><EditUser /></MemoryRouter>);
    const nameInput = screen.getByPlaceholderText("Full Name");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");
  });

  it("should update email field on change", () => {
    render(<MemoryRouter><EditUser /></MemoryRouter>);
    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput).toHaveValue("john@example.com");
  });

  it("should update mobile number field on change", () => {
    render(<MemoryRouter><EditUser /></MemoryRouter>);
    const mobileNumberInput = screen.getByPlaceholderText("Mobile Number");

    fireEvent.change(mobileNumberInput, { target: { value: "1234567890" } });
    expect(mobileNumberInput).toHaveValue("1234567890");
  });

  it("should update password field on change", () => {
    render(<MemoryRouter><EditUser /></MemoryRouter>);
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(passwordInput, { target: { value: "Pass123$" } });
    expect(passwordInput).toHaveValue("Pass123$");
  });


  it("should toggle password visibility", () => {
    render(<MemoryRouter><EditUser /></MemoryRouter>);

    const toggleButton = screen.getByTestId("password-toggle");
    const passwordInput = screen.getByPlaceholderText("Password");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
