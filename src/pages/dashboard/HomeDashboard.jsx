import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import Main from "../../component/dashboard/Main";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { Check } from "react-bootstrap-icons";

const HomeDashboard = () => {
  
  // Get Data
  const [items, setItems] = useState([]);
  const [card, setCard] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dashboard");
      const card = response.data.card;
      const items = response.data.data;
      setCard(card);
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  // End Get Data

  // Modal Check
  const [show, setShow] = useState(false);

  const checkClose = () => {
    setShow(false);
    fetchDashboard();
  };

  const checkShow = (items) => {
    setSelectedLoan(items);
    setShow(true);
  };
  // End Modal Check

  // Check Items
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [description, setDescription] = useState(null);
  const [kondisi, setKondisi] = useState(null);

  const checkLoan = async (event) => {
    try {
      event.preventDefault();
      const checkItems = {
        description: description,
        condition: kondisi,
      };
      await axios.put(
        `http://localhost:3000/dashboard/check/${selectedLoan._id}`,
        checkItems
      );
      fetchDashboard();
      checkClose();
      Swal.fire({
        icon: "success",
        title: "Items Check Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // Check Items
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Main title="DASHBOARD" pageHeading={"Dashboard"} bread={"Dashboard"}>
      <Row>
        <>
          <Col className="col-xl-4 col-lg-6 col-md-12 col-12 mt-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0 fw-bold">Available Items</h6>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <i class="fa-solid fa-box-check text-dark fa-xl"></i>
                  </div>
                </div>
                <div>
                  <p className="">{card[0]} Items</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-xl-4 col-lg-6 col-md-12 col-12 mt-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0 fw-bold">Not Available Items</h6>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <i class="fa-solid fa-circle-xmark text-dark fa-xl"></i>
                  </div>
                </div>
                <div>
                  <p className="">{card[1]} Items</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-xl-4 col-lg-6 col-md-12 col-12 mt-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0 fw-bold">Needs Repair</h6>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                  <i class="fa-solid fa-screwdriver-wrench text-dark fa-xl"></i>
                  </div>
                </div>
                <div>
                  <p className="">{card[2]} Items</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </>
        <Col>
          <h3 className="fw-bold mt-4">Maintanance Table</h3>
          <Card className="p-3 mb-4">
            <TableContainer
              style={{ height: 490, width: "100%" }}
              component={Paper}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold text-center">No</TableCell>
                    <TableCell className="fw-bold text-center">Items</TableCell>
                    <TableCell className="fw-bold text-center">Condition</TableCell>
                    <TableCell className="fw-bold text-center">Description</TableCell>
                    <TableCell className="fw-bold text-center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell className="text-center">{row.name}</TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`badge ${
                              row.condition === 2
                                ? "bg-warning"
                                : row.condition === 3
                                ? "bg-danger"
                                : ""
                            }`}
                          >
                            {row.condition === 2
                              ? "Middle"
                              : row.condition === 3
                              ? "Broken"
                              : ""}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{row.description}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="success" className="me-2" onClick={() => checkShow(row)}>
                            <Check />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal Check */}
      <Modal show={show} onHide={checkClose}>
      <Form onSubmit={checkLoan}>
        <Modal.Header closeButton>
          <Modal.Title>Check Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Items</Form.Label>
          <Form.Control
            required
            type="text"
            name="Items"
            value={selectedLoan?.name}
            placeholder="Items"
            disabled
          />
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <Form.Group className="mb-1">
              <Form.Label>Condition</Form.Label>
              <Form.Select
                onChange={(e) => setKondisi(e.target.value)}
                value={kondisi}
              >
                <option value="">Choose Condition</option>
                <option value="1"> Good</option>
                <option value="2">Middle</option>
                <option value="3">Broken</option>
              </Form.Select>
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={checkClose}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
      {/* End Modal Check */}

    </Main>
  );
};

export default HomeDashboard;
