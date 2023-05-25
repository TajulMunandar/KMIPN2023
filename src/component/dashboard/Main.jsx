import React from "react";
import "../../assets/css/theme.css";
import "../../assets/css/dashboard/style.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navibar from "./Navbar";

const Main = ({ title, pageHeading, children }) => {
  return (
    <div className="bg-dashboard">
      <div id="db-wrapper">
        <Sidebar />
        <div id="page-content">
          <div className="header @@classList">
            <Navibar />
          </div>
          <Container className="container-fluid px-6 mt-4">
            <Row>
              <Col className="col-lg-12 col-md-12 col-12">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mb-2 mb-lg-0">
                      <h3 className="mb-0 fw-semibold text-dark">{pageHeading}</h3>
                    </div>
                  </div>
                </div>
              </Col>
              {children}
            </Row>
          </Container>
        </div>
      </div>
   </div>
  );
};

export default Main;
