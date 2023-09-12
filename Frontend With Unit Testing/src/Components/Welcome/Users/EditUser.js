import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditUser = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [roleId, setRoleId] = useState({});
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const URL = `https://localhost:7264/api/users/${userId}`;

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const form = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      password: data.password,
      mobileNumber: data.mobileNumber,
      roleId: selectedRole,
      specializationId: data.specializationId,
      hospitalId: data.hospitalId,
    };
  
    fetch("https://localhost:7264/api/users/" + data.userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response)
      .then((data) => {
        handleBackBtn();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        navigate("/user");
      });
  };
  
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    axios
      .get("https://localhost:7264/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching roles:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("https://localhost:7264/api/users")
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
        // console.log(allUsers);
      })
      .catch((error) => {
        // console.error(`Error:${error}`);
      });
  };

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        // console.log("Useffect", res.data);
        setData(res.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  }, [URL, userId]);

  const handleBackBtn = () => {
    navigate("/user");
  };

  const change = (event) => {
    setSelectedRole(event.target.value);
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <div>
        <h3 className="heading">Edit User Form</h3>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <b>Enter your full name :</b>
        </label>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={data.name || ""}
          pattern="[A-Za-z ]+"
          title="Must contain alphabets and spaces only, numbers not allowed"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <br />

        <label htmlFor="email">
          <b>Enter your email address :</b>
        </label>
        <input
          type="email"
          value={data.email || ""}
          placeholder="Email"
          required
          title="Email should be in proper format"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <br />

        <label htmlFor="contact">
          <b>Enter your mobile number :</b>
        </label>
        <input
          type="text"
          placeholder="Mobile Number"
          required
          value={data.mobileNumber || ""}
          pattern="[0-9]{10}"
          title="Mobile number should contain exactly 10 digits"
          onChange={(e) => setData({ ...data, mobileNumber: e.target.value })}
        />

        <br />

        <label htmlFor="password">
          <b>Enter your Password :</b>
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={data.password || ""}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title="Password must contain at least 8 characters, including 1 alphabet, 1 number, and 1 special character."
            required
          />
          <button
            type="button"
            data-testid="password-toggle"
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <br />

        <label htmlFor="roleDropdown">Select your role:</label>
        <select id="roleDropdown" value={selectedRole} onChange={change}>
          {roles.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName}
            </option>
          ))}
        </select>

        <br />
        <div className="btn-container">
          <input
            type="button"
            className="back-btn"
            value="Back"
            onClick={handleBackBtn}
          />
          <input type="submit" className="btn" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
