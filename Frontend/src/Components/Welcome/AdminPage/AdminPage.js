import React, { useEffect, useState } from "react";
import {
  ContainerFluid,
  MainContent,
  CardContainer,
  CardImage,
  CardTitle,
  CardText,
  CardListItem,
} from "../../StyledComponents/AdminPageStyles";
import {
  FaHome,
  FaHospitalSymbol,
  FaUserAlt,
  RiAdminLine,
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Image from "../../image/doctor.jpg";
import Error from "../../Error/Error";

const AdminPage = () => {
  const loggeduser = localStorage.getItem("jwtToken");
  console.log(loggeduser);

  return (
    <>
      {loggeduser === null ? (
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
                  <CardContainer className="container">
                    <div className="card my-5">
                      <div className="row g-0">
                        <div className="col-md-4 order-md-2">
                          <CardImage
                            src={Image}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <CardTitle>Welcome To Admin Page</CardTitle>
                            <br />
                            <CardText>
                              <h5>
                                1. Admin can add, delete and update the
                                hospitals.
                              </h5>
                              <br />
                              <h5>
                                2. Admin can add, delete and update the users.
                              </h5>
                              <br />
                              <h5>3. Admin can add and delete the roles.</h5>
                            </CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContainer>
                </MainContent>
              </Col>
            </Row>
          </ContainerFluid>
        </>
      )}
    </>
  );
};

export default AdminPage;
