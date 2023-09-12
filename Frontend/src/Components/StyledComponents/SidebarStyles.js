import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHospitalSymbol, FaUserAlt } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';

export const SidebarContainer = styled.nav`
  width: auto;
  height: 100vh;
  background-color: rgba(5, 68, 104);
  padding: 20px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

export const SidebarTitle = styled.h2`
  color: whitesmoke;
  margin-bottom: 20px;
  font-size: 1.8rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

export const SidebarItem = styled.li`
  margin: 30px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin: 20px;
  }
`;

export const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: whitesmoke;
  font-size: 1.6rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }

  &:focus,
  &:hover,
  &:active {
    color: #5e5df0;
    outline: none;
  }
`;

export const SideIcons = styled.div`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  column-gap: 12px;
  font-size: 1.5rem;
  color: whitesmoke;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;
