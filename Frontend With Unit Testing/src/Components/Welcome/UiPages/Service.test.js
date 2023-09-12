import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Services from './Services';
import NavBar from '../../Home/NavBar';
import Footer from '../../Home/Footer';
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

describe('Services Component', () => {
  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
  });

  it('should render the NavBar component', () => {
    const { container } = render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    expect(container.querySelector('.navbar')).toBeInTheDocument();
  });

  it('should render the Footer component', () => {
    const { container } = render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    expect(container.querySelector('.footer')).toBeInTheDocument();
  });

  it('should render three service descriptions', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    const serviceDescriptions = getAllByText(
      /1\.|2\.|3\./i // Using regex to match the numbered list
    );
    expect(serviceDescriptions).toHaveLength(3);

    const expectedServices = [
      '1. We provide one on one consultation with doctors',
      '2. We provide provision for online doctor appointment',
      '3. We provide provision to book doctor appointment based on his specialization',
    ];

    serviceDescriptions.forEach((node, index) => {
      expect(node.textContent).toBe(expectedServices[index]);
    });
  });


});


