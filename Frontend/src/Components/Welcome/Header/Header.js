import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import {
  Nav,
  NavList,
  NavItem,
  Icon,
  AdminLogo,
  AdminLogoText,
  Dropdown,
  DropdownButton,
} from '../../StyledComponents/HeaderStyles';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  const navigate = useNavigate();

  const homeClickHandler = () => {
    navigate('/admin');
  };

  return (
    <div className="body">
      <Nav>
        <NavList>
          <Icon>
            <FaHome onClick={homeClickHandler} />
          </Icon>
          <NavItem>
            <AdminLogo onClick={toggleDropdown}>
              <AiOutlineUser />
              <AdminLogoText>Admin</AdminLogoText>
            </AdminLogo>
            {dropdownOpen && (
              <Dropdown>
                <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
              </Dropdown>
            )}
          </NavItem>
        </NavList>
      </Nav>
    </div>
  );
};

export default Header;
