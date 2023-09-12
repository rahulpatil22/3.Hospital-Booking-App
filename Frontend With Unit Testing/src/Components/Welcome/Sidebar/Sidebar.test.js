import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

describe("Sidebar", () => {
  test("should render the Sidebar component with correct content", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const hospitalsLink = screen.getByText("Hospitals");
    const usersLink = screen.getByText("Users");
    const rolesLink = screen.getByText("Roles");

    expect(hospitalsLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(rolesLink).toBeInTheDocument();
  });

  test("should have correct links and paths", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const hospitalsLink = screen.getByText("Hospitals");
    const usersLink = screen.getByText("Users");
    const rolesLink = screen.getByText("Roles");

    expect(hospitalsLink).toHaveAttribute("href", "/hospital");
    expect(usersLink).toHaveAttribute("href", "/user");
    expect(rolesLink).toHaveAttribute("href", "/role");
  });

  test("should have correct icons", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const hospitalsIcon = screen.getByTestId("hospitals-icon");
    const usersIcon = screen.getByTestId("users-icon");
    const rolesIcon = screen.getByTestId("roles-icon");

    expect(hospitalsIcon).toBeInTheDocument();
    expect(usersIcon).toBeInTheDocument();
    expect(rolesIcon).toBeInTheDocument();
  });
});
