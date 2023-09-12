import React from "react";
import {
  SidebarContainer,
  SidebarList,
  SidebarItem,
  SidebarLink,
  SideIcons,
} from "../../StyledComponents/SidebarStyles";
import { FaHospitalSymbol, FaUserAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarList>
        <SidebarItem>
          <SideIcons>
            <FaHospitalSymbol />
            <SidebarLink to="/hospital">Hospitals</SidebarLink>
          </SideIcons>
        </SidebarItem>
        <SidebarItem>
          <SideIcons>
            <FaUserAlt />
            <SidebarLink to="/user">Users</SidebarLink>
          </SideIcons>
        </SidebarItem>
        <SidebarItem>
          <SideIcons>
            <HiUsers />
            <SidebarLink to="/role">Roles</SidebarLink>
          </SideIcons>
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
