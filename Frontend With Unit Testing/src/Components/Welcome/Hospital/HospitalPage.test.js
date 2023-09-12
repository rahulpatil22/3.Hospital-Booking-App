import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import HospitalPage from "./HospitalPage";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

describe("HospitalPage", () => {
  const localStorageMock = {
    getItem: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue("dummyJwtToken");
  });

  it("renders the component with a list of hospitals", async () => {
    const mockHospitals = [
      { hospitalId: 1, hospitalName: "Hospital 1", location: "Location 1" },
      { hospitalId: 2, hospitalName: "Hospital 2", location: "Location 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockHospitals });

    render(
      <MemoryRouter>
        <HospitalPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Hospital 1", { exact: false })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Hospital 2", { exact: false })).toBeInTheDocument();
    });
  });


  it("deletes a hospital when the delete button is clicked", async () => {
    const mockHospitals = [
      { hospitalId: 1, hospitalName: "Hospital 1", location: "Location 1" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockHospitals });
    axios.delete.mockResolvedValueOnce({});
  
    render(
      <MemoryRouter>
        <HospitalPage />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText("Hospital 1", { exact: false })).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByTestId("delete-button"));
  
    await waitFor(() => {
        expect(axios.delete).toHaveBeenCalledWith(
          "https://localhost:7264/api/Hospital/1"
        );
      });
      
  
  });
  
});
