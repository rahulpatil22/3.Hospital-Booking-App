import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(5, 68, 104);
  padding: 10px;
  height: 110px;
`;

export const HomeIcon = styled.div`
  margin-left: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
`;

export const NavbarItems = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
`;

export const NavbarItem = styled.li`
  margin-right: 28px;
  padding-top: 12px;
  &:last-child {
    margin-right: 16px;
  }
`;

export const SigninButton = styled.button`
  background-color: #1182fc;
  border: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 10px;
  border-radius: 10px;

  &:hover {
    background-color: #0056b3;
  }

  a {
    color: #fff !important;
    text-decoration: none;
  }
`;

export const NavbarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding-top: 16px;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    color: #555;
  }
`;
