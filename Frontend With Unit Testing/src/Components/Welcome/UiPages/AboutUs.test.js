import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AboutUs from "./AboutUs";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

jest.mock("../../image/doctor.jpg", () => "mock-image-url");

describe("AboutUs component", () => {
  it("renders the title and description correctly", () => {
    render(
      <Router>
        <AboutUs />
      </Router>
    );

    const titleElement = screen.getByText(
      "Hospital Appointment Booking System"
    );
    const descriptionElement = screen.getByText(
      "One of main issue with current pandemic situation is that the hospitals are bit busy dealing with covid patients and other patients showing similar symptoms so its not easy for their regular patients who used to get a checkup or consultation. This is worsened by the restrictions due to lockdowns and the fear of contracting the contagious virus. So to deal with this issue we have come up with an approach and built this system which provides medical services and allows users to connect and consult with doctors. The aim was to build a minimalist UI for the system so people of any age group could easily navigate through it. A hospital can register their doctors in the system through their legal process and then patients can search doctors from varied specialization for consultation."
    );
  });

  it("renders the image correctly with the specified width and height", () => {
    render(
      <Router>
        <AboutUs />
      </Router>
    );

    const imageElement = screen.getByAltText("...");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "mock-image-url");
    expect(imageElement).toHaveAttribute("width", "300");
    expect(imageElement).toHaveAttribute("height", "300");
  });

  it("renders the NavBar and Footer components", () => {
    render(
      <Router>
        <AboutUs />
      </Router>
    );
    const navBarElement = screen.getByTestId("navbar");
    const footerElement = screen.getByTestId("footer");

    expect(navBarElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});
