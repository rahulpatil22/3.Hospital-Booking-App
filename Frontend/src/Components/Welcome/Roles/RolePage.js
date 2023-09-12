import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import Error from "../../Error/Error";
import {
  ContainerFluid,
  MainContent,
  CardContainer,
  CardImage,
  CardTitle,
  CardText,
  CardListItem,
} from "../../StyledComponents/AdminPageStyles";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const API_URL = "https://localhost:7264/api/roles";
  const jwtToken = localStorage.getItem("jwtToken");

  const config = {
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  };

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = () => {
    axios
      .get(`${API_URL}`, config)
      .then((res) => {
        const allRoles = res.data;
        setRoles(allRoles);
        console.log(allRoles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRole = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`, config);
      console.log("deleted successfully", res);
      getRoles();
    } catch (err) {
      console.error(`Error:${err}`);
    }
  };

  return (
    <>
      {jwtToken === null ? (
        <Error />
      ) : (
        <>
          {/* Header */}

          <Header />
          <ContainerFluid>
            <Row>
              {/* Sidebar */}
              <Col md={2}>
                <Sidebar />
              </Col>

              {/* Main Content */}
              <Col md={10}>
                <MainContent>
                  <div id="main">
                    <article>
                      <h2 style={{ textAlign: "center" }}>LIST OF ROLES</h2>
                      <br />
                      <Link to="/addrole">
                        <Button variant="contained" startIcon={<Add />}>
                          Add Role
                        </Button>
                      </Link>
                      <br />
                      <br />
                      <div style={{ margin: "2rem" }}>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">
                                  <b style={{ fontSize: "18px" }}>Roles</b>
                                </TableCell>
                                <TableCell align="center">
                                  <b style={{ fontSize: "18px" }}>Actions</b>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {roles && roles.length > 0
                                ? roles.map((role) => (
                                    <TableRow key={role.roleId}>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                      >
                                        {role.roleName}
                                      </TableCell>
                                      <TableCell align="center">
                                        <Button
                                          data-testid="delete-button"
                                          variant="contained"
                                          startIcon={<DeleteIcon />}
                                          onClick={() =>
                                            deleteRole(role.roleId)
                                          }
                                        >
                                          Delete
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                : "No data available"}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </article>
                  </div>
                </MainContent>
              </Col>
            </Row>
          </ContainerFluid>
        </>
      )}
    </>
  );
};

export default RolePage;
