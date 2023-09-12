import React from 'react';
import "./Sidebar.css";
import { FaHospitalSymbol } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar" data-testid="sidebar">
    <ul>
      <li>
        <div className="side-icons" data-testid="hospitals-icon">
          <FaHospitalSymbol />
          <Link to="/hospital">Hospitals</Link>
        </div>
      </li>
      <li>
        <div className="side-icons" data-testid="users-icon">
          <FaUserAlt />
          <Link to="/user">Users</Link>
        </div>
      </li>
      <li>
        <div className="side-icons" data-testid="roles-icon">
          <HiUsers />
          <Link to="/role">Roles</Link>
        </div>
      </li>
    </ul>
  </nav>
  )
}

export default Sidebar
