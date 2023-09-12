import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Hospital/Hospital.css";
import Button from "@mui/material/Button";
import { navigateToRole } from "./NavigationUtils";

const AddRole = () => {
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState([]);

  const API_URL_ALL_ROLES = "https://localhost:7264/api/roles";

  useEffect(() => {
    getRoles();
  }, []);

  // const getRoles = () => {
  //   axios
  //     .get(`${API_URL_ALL_ROLES}`)
  //     .then((res) => {
  //       const allRoles = res.data;
  //       setRoles(allRoles);
  //       console.log(allRoles);
  //     })
  //     .catch((err) => {
  //       console.error(`Error: ${err}`);
  //     });
  // };
  const getRoles=async()=>{
    try {
      const response = await axios.get("https://localhost:7264/api/roles");
      const allRoles = response.data;
      setRoles(allRoles);
     
    }
    catch(err){
      // console.log(err);
 }
  }

  const navigate = useNavigate();

  const url = "https://localhost:7264/api/roles";

  const onRoleChangeHandler = (e) => {
    setRoleName(e.target.value);
  };

  const backBtnHandler = () => {
    navigate("/role");
  };

  const onSubmitClickHandler = async (e) => {
    e.preventDefault();

    const tmpRoles = roles.filter(
      (item) => item.roleName.toLowerCase() == roleName.toLowerCase()
    );
    if (tmpRoles.length > 0) {
      alert("Role already exist, Please enter different role.");
      return;
    }

    const post = {
      roleName,
    };

    try {
      const res = await axios.post(url, post);

      console.log(res);
      navigateToRole();
    } catch (err) {
      // console.error(`Error: ${err}`);
    }

    navigate("/role");
  };

  return (
    <div className="form-container">
      <div>
        <h3 className="heading">Add Role Form</h3>
      </div>
      <br />

      <form onSubmit={onSubmitClickHandler}>
        <label htmlFor="dropdown">Select your role:</label>

        <input
          type="text"
          data-testid="role-input"
          placeholder="Add Role"
          value={roleName}
          onChange={onRoleChangeHandler}
          required
        />

        <br />
        <div className="btn-container">
          <input
            type="button"
            className="back-btn"
            value="Back"
            onClick={backBtnHandler}
          />
          <input type="submit" className="btn" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddRole;
