// import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
// import axios from "axios";
// import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";
// import LoginForm from "./LoginForm";
// import { MemoryRouter } from "react-router-dom";

// // Mocking axios post for successful login and invalid credentials
// jest.mock("axios");
// axios.post.mockResolvedValue({ data: "fakeJwtToken" });
// axios.post.mockRejectedValue({ response: { data: "Invalid credentials" } });

// describe("Login Component", () => {
//   it("renders login form", () => {
//     const { getByPlaceholderText, getByText } = render(
//       <MemoryRouter>
//         <LoginForm />
//       </MemoryRouter>
//     );

//     const emailInput = getByPlaceholderText("Enter email");
//     const passwordInput = getByPlaceholderText("Enter password");
//     const submitButton = getByText("Submit");

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });

//   it("updates email and password on input change", () => {
//     const { getByPlaceholderText } = render(
//       <MemoryRouter>
//         <LoginForm />
//       </MemoryRouter>
//     );

//     const emailInput = getByPlaceholderText("Enter email");
//     const passwordInput = getByPlaceholderText("Enter password");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "test123" } });

//     expect(emailInput.value).toBe("test@example.com");
//     expect(passwordInput.value).toBe("test123");
//   });

//   it("submits the form with valid credentials", async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <MemoryRouter>
//         <LoginForm />
//       </MemoryRouter>
//     );

//     const emailInput = getByPlaceholderText("Enter email");
//     const passwordInput = getByPlaceholderText("Enter password");
//     const submitButton = getByText("Submit");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "test123" } });

//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledTimes(1);
//       expect(localStorage.getItem("jwtToken")).toBe("fakeJwtToken");
//     });
//   });

//   it("shows alert on invalid credentials", async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <MemoryRouter>
//         <LoginForm />
//       </MemoryRouter>
//     );

//     const emailInput = getByPlaceholderText("Enter email");
//     const passwordInput = getByPlaceholderText("Enter password");
//     const submitButton = getByText("Submit");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledTimes(1);
//       expect(localStorage.getItem("jwtToken")).toBe(null);
//     });
//   });
// });


import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

// Mocking axios post for successful login and invalid credentials
jest.mock("axios");

describe("Login Component", () => {
  it("submits the form with valid credentials", async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    axios.post.mockResolvedValue({ data: "fakeJwtToken" });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Enter email");
    const passwordInput = getByPlaceholderText("Enter password");
    const submitButton = getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledWith("jwtToken", "fakeJwtToken");
      expect(alertSpy).toHaveBeenCalledWith("Successfully loggedin");
    });

    setItemSpy.mockRestore(); // Restore the original setItem implementation
    alertSpy.mockRestore(); // Restore the original alert implementation
  });

  it("shows alert on invalid credentials", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    axios.post.mockRejectedValue({ response: { data: "Invalid credentials" } });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Enter email");
    const passwordInput = getByPlaceholderText("Enter password");
    const submitButton = getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith("Invalid credentials");
    });

    alertSpy.mockRestore(); // Restore the original alert implementation
  });
});


