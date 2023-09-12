import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dataToLoggedIn = {
    email,
    password,
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    console.log("Submitted form");

    axios
      .post("https://localhost:7264/api/login/", dataToLoggedIn)
      .then((response) => {
        const jwtToken = response.data;
        localStorage.setItem("jwtToken", jwtToken);
        alert("Successfully loggedin");
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        alert("Invalid credentials");
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmitLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
