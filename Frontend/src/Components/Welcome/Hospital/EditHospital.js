import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormContainer,
  Heading,
  Label,
  Input,
  Button,
  BtnContainer,
} from "../../StyledComponents/FormStyles";

const EditHospital = () => {
  const { hospitalId } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const URL = "https://localhost:7264/api/Hospital/";
  const jwtToken = localStorage.getItem("jwtToken");

  const config = {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  };

  useEffect(() => {
    axios
      .get(`${URL}${hospitalId}`, config)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [hospitalId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${URL}${hospitalId}`, data, config)
      .then((res) => {
        alert("Data updated successfully");
        navigate("/hospital");
      })
      .catch((err) => console.log(err));
  };

  const backBtnHandler = () => {
    navigate("/hospital");
  };

  return (
    <FormContainer>
      <div>
        <Heading>Edit Hospital Form</Heading>
      </div>
      <br />

      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          <b>Name of Hospital :</b>
        </Label>
        <Input
          type="text"
          placeholder="Hospital's Name"
          value={data.hospitalName || ""}
          onChange={(e) => setData({ ...data, hospitalName: e.target.value })}
          required
          pattern="[A-Za-z ]+"
          title="Must contain alphabets and spaces only, numbers not allowed"
        />

        <Label htmlFor="locality">
          <b>Locality of Hospital :</b>
        </Label>
        <Input
          type="text"
          placeholder="Address of Hospital"
          value={data.location || ""}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          required
          title="Can contain alphabets, numbers and some relevant symbols"
        />

        <BtnContainer>
          <Button
            type="button"
            className="back-btn"
            value="Back"
            onClick={backBtnHandler}
            back
          />
          <Button type="submit" className="btn" value="Update" />
        </BtnContainer>
      </form>
    </FormContainer>
  );
};

export default EditHospital;
