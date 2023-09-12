import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: rgb(5, 68, 104);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const NavItem = styled.li`
  margin-left: 2rem;
`;

export const Icon = styled.div`
  font-size: 2rem;
  color: #ffffff;
  position: absolute;
  left: 4rem;
  top: 50%;
  transform: translateY(-50%);

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    left: 2rem;
    right: 2rem;
  }
`;

export const AdminLogo = styled.div`
  font-size: 2rem;
  color: #ffffff;
  position: absolute;
  right: 4rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    left: 2rem;
    right: 2rem;
  }
`;

export const AdminLogoText = styled.span`
  margin-left: 0.75rem;
  font-size: 24px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 73%;
  right: 2%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    right: 2rem;
  }
`;

export const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  background-color: rgb(251, 69, 69);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: red;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px red;
  }
`;
