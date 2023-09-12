import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPage from "./AdminPage";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

describe("AdminPage", () => {
  test("should render the AdminPage component with correct content", () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome To Admin Page")).toBeInTheDocument();
    expect(
      screen.getByText("1. Admin can add, delete and update the hospitals.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2. Admin can add, delete and update the users.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3. Admin can add and delete the roles.")
    ).toBeInTheDocument();

    const imageElement = screen.getByAltText("...");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "doctor.jpg");
    expect(imageElement).toHaveAttribute("width", "300");
    expect(imageElement).toHaveAttribute("height", "300");
  });

  test("should render the Header and Sidebar components", () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    const headerElement = screen.getByTestId("header");
    const sidebarElement = screen.getByTestId("sidebar");

    expect(headerElement).toBeInTheDocument();
    expect(sidebarElement).toBeInTheDocument();
  });
});
