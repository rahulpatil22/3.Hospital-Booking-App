import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";


describe("Home Component", () => {
  it("renders Navbar component", () => {
    const { getByTestId } = render(
        <MemoryRouter><Home /></MemoryRouter>);
    const navbarElement = getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });

  it("renders Jumbo component", () => {
    const { getByTestId } = render(<MemoryRouter><Home /></MemoryRouter>);
    const jumboElement = getByTestId("jumbo");
    expect(jumboElement).toBeInTheDocument();
  });

  it("renders CardSection component", () => {
    const { getByTestId } = render(<MemoryRouter><Home /></MemoryRouter>);
    const cardSectionElement = getByTestId("card-section");
    expect(cardSectionElement).toBeInTheDocument();
  });

  it("renders Footer component", () => {
    const { getByTestId } = render(<MemoryRouter><Home /></MemoryRouter>);
    const footerElement = getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });
});
