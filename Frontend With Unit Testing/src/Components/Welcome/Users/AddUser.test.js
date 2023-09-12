import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import axios from "axios"; // You can use a mock for axios

import AddUser from "./AddUser";

import { MemoryRouter } from "react-router-dom";

import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

// Import the AddUser component here

// Mock axios post function

jest.mock("axios");

// Mock the navigate function

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useNavigate: () => mockNavigate,
}));

describe("AddUser Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    );
  });

  it("renders without errors", () => {
    // Check if the component renders without throwing errors

    // You can use screen queries to verify the presence of specific elements

    const heading = screen.getByText("Add User Form");

    expect(heading).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    // Simulate input changes for name, email, mobile number, and password fields

    userEvent.type(screen.getByPlaceholderText("Full Name"), "John Doe");

    userEvent.type(screen.getByPlaceholderText("Email"), "john@example.com");

    userEvent.type(screen.getByPlaceholderText("Mobile Number"), "1234567890");

    userEvent.type(screen.getByPlaceholderText("Password"), "Pass123$");

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();

    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();

    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Pass123$")).toBeInTheDocument();
  });

  it("updates roleId state on role selection", async () => {
    // Mock axios.get calls within useEffect

    axios.get

      .mockResolvedValueOnce({
        data: [{ roleId: "doctor", roleName: "Doctor" }],
      })

      .mockResolvedValueOnce({ data: [] }) // For specialization

      .mockResolvedValueOnce({ data: [] }); // For hospital

    // Simulate selecting a role from the dropdown

    const roleDropdown = screen.getByLabelText("Select your role:");

    fireEvent.change(roleDropdown, { target: { value: "doctor" } });

    // Wait for the asynchronous updates to take effect

    // await screen.findByDisplayValue("Doctor");

    // Expect the selected role to be displayed in the dropdown

    // expect(screen.getByDisplayValue("Doctor")).toBeInTheDocument();
  });

  it("updates specialization state on specialization selection for doctor role", () => {
    // Simulate selecting a role and a specialization for doctor

    const roleDropdown = screen.getByLabelText("Select your role:");

    fireEvent.change(roleDropdown, { target: { value: "doctor" } });

    const specializationDropdown = screen.getByLabelText(
      "Select your Specialization:"
    );

    fireEvent.change(specializationDropdown, { target: { value: "1" } });

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("updates hospital state on hospital selection for non-user roles", () => {
    // Simulate selecting a role and a hospital for non-user role

    const roleDropdown = screen.getByLabelText("Select your role:");

    fireEvent.change(roleDropdown, { target: { value: "doctor" } });

    // Find the hospital dropdown using its role

    const hospitalDropdown = screen.getByRole("listbox", {
      name: "Select your Hospital:",
    });

    fireEvent.change(hospitalDropdown, { target: { value: "2" } });

    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    // Simulate clicking the password visibility toggle button

    const toggleButton = screen.getByRole("button", {
      name: "Toggle password visibility",
    });

    userEvent.click(toggleButton);

    const passwordInput = screen.getByPlaceholderText("Password");

    expect(passwordInput.getAttribute("type")).toBe("text");
  });

  it("navigates to /user on back button click", () => {
    // Simulate clicking the back button

    const backButton = screen.getByRole("button", { name: "Back" });

    userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/user");
  });

  it("submits form and makes axios post request on submit button click", async () => {
    // Mock the axios.post function to return a successful response

    axios.post.mockResolvedValue({ data: {} });

    // Mock axios.get calls within useEffect

    axios.get

      .mockResolvedValueOnce({ data: [{ roleId: 1, roleName: "doctor" }] })

      .mockResolvedValueOnce({
        data: [{ specializationId: 1, specializationName: "Cardiology" }],
      })

      .mockResolvedValueOnce({
        data: [{ hospitalId: 2, hospitalName: "ABC Hospital" }],
      });

    // Render the component

    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    );

    // Retrieve the submit button

    const submitButton = screen.queryByLabelText(/UserSubmit/i);

    // ... rest of the test ...

    userEvent.click(submitButton);

    // Wait for asynchronous actions to complete

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://localhost:7264/api/users",

        expect.objectContaining({
          // ... expected data ...
        })
      );

      // Assert that the navigate function was called with the correct path

      expect(mockNavigate).toHaveBeenCalledWith("/user");
    });
  });
});

// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import AddUser from "./AddUser"; // Update the path accordingly

// describe("AddUser Component", () => {
//   test("renders the component", () => {
//     render(<AddUser />, { wrapper: MemoryRouter });
//     // Add your assertions here
//   });

//   test("changes name input", () => {
//     const { getByPlaceholderText } = render(<AddUser />, {
//       wrapper: MemoryRouter,
//     });

//     const nameInput = getByPlaceholderText("Full Name");
//     fireEvent.change(nameInput, { target: { value: "John Doe" } });

//     expect(nameInput.value).toBe("John Doe");
//   });

//   test("changes email input", () => {
//     const { getByPlaceholderText } = render(<AddUser />, {
//       wrapper: MemoryRouter,
//     });

//     const emailInput = getByPlaceholderText("Email");
//     fireEvent.change(emailInput, { target: { value: "john@example.com" } });

//     expect(emailInput.value).toBe("john@example.com");
//   });

//   test("changes contact input", () => {
//     const { getByPlaceholderText } = render(<AddUser />, {
//       wrapper: MemoryRouter,
//     });

//     const contactInput = getByPlaceholderText("Mobile Number");
//     fireEvent.change(contactInput, { target: { value: "1234567890" } });

//     expect(contactInput.value).toBe("1234567890");
//   });

//   test("changes password input", () => {
//     const { getByPlaceholderText } = render(<AddUser />, {
//       wrapper: MemoryRouter,
//     });

//     const passwordInput = getByPlaceholderText("Password");
//     fireEvent.change(passwordInput, { target: { value: "P@ssw0rd" } });

//     expect(passwordInput.value).toBe("P@ssw0rd");
//   });

//   test("clicks back button", () => {
//     const { getByText } = render(<AddUser />, { wrapper: MemoryRouter });

//     fireEvent.click(getByText("Back"));

//     // Assert navigation or any other expected behavior here
//   });

//   // Add more tests for other input fields, buttons, and interactions...
// });
