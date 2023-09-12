import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  NavbarContainer,
  HomeIcon,
  NavbarItems,
  NavbarItem,
  SigninButton,
  NavbarLink,
} from "../StyledComponents/NavbarStyles";

function NavBar() {
  const navigate = useNavigate();

  const homeClickHandler = () => {
    navigate("/");
  };

  return (
    <NavbarContainer>
      <HomeIcon onClick={homeClickHandler}>
        <FaHome />
      </HomeIcon>
      <NavbarItems>
        <NavbarItem>
          <NavbarLink to="/about">About</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink to="/services">Services</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <SigninButton>
            <NavbarLink to="/login">SignIn</NavbarLink>
          </SigninButton>
        </NavbarItem>
      </NavbarItems>
    </NavbarContainer>
  );
}

export default NavBar;
