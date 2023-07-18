import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
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
import { Check2, PencilSquare } from "react-bootstrap-icons";

const PeminjamanDashboard = () => {
  // Get Data
  const [peminjaman, setPeminjaman] = useState([]);

  const fetchPeminjaman = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/peminjaman"
      );
      const peminjaman = response.data.data;
      setPeminjaman(peminjaman);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeminjaman();
    fetchLoaner();
    fetchItems();
  }, []);
  // End Get Data

  // Modal Tambah
  const [show1, setShow1] = useState(false);

  const tambahClose = () => {
    setShow1(false);
  };

  const tambahShow = () => {
    fetchPeminjaman();
    fetchLoaner();
    fetchItems();
    setShow1(true);
  };
  // End Modal Tambah

  // Add Data
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/barang"
      );
      const items = response.data.data;
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState([]);

  const fetchLoaner = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dashboard/user");
      const user = response.data.data;
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const [barang, setBarang] = useState("");
  const [loaner, setLoaner] = useState("");
  const [qty, setQty] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const addPeminjaman = async (event) => {
    try {
      event.preventDefault();
      const PeminjamanData = {
        userId: loaner,
        itemId: barang,
        qty: qty,
        description: keterangan,
      };
      await axios.post(
        "http://localhost:3000/dashboard/peminjaman",
        PeminjamanData
      );
      fetchPeminjaman();
      tambahClose();
      Swal.fire({
        icon: "success",
        title: "Item successfully borrowed",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.status,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  // End Add Data

  // Modal Check
  const [show, setShow] = useState(false);

  const checkClose = () => {
    setSelectedLoan(null);
    setShow(false);
  };

  const checkShow = (peminjaman) => {
    setSelectedLoan(peminjaman);
    setShow(true);
  };
  // End Modal check

  // Check Loan
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
        `http://localhost:3000/dashboard/peminjaman/check/${selectedLoan._id}`,
        checkItems
      );
      fetchPeminjaman();
      checkClose();
      Swal.fire({
        icon: "success",
        title: "Loan Check Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  //

  // Modal Edit
  const [show2, setShow2] = useState(false);
  const [selectedEditLoan, setSelectedEditLoan] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedLoanerName, setEditedLoanerName] = useState("");
  const [editedQty, setEditedQty] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const editClose = () => {
    setSelectedEditLoan(null);
    setShow2(false);
  };

  const editShow = (peminjaman) => {
    setSelectedEditLoan(peminjaman);
    setEditedItemName(peminjaman.itemId._id);
    setEditedLoanerName(peminjaman.userId._id);
    setEditedQty(peminjaman.qty);
    setEditedDescription(peminjaman.description);
    setShow2(true);
    console.log(peminjaman.itemId);
  };
  //

   // Edit Data
   const updateLoan = async (event) => {
    try {
      event.preventDefault();
      if (selectedEditLoan) {
        const LoanData = {
          userId: editedLoanerName,
          itemId: editedItemName,
          qty: editedQty,
          description: editedDescription,
        };
        await axios.put(
          `http://localhost:3000/dashboard/peminjaman/${selectedEditLoan._id}`,
          LoanData
        );
        fetchPeminjaman();
        editClose();
        Swal.fire({
          icon: "success",
          title: "Loan Has Been Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.status,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  };
  // End Edit Data

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
    <Main title="Loan Table" pageHeading={"Loan Table"} bread={"Loan"}>
      <Container>
        <Button className="fw-normal mb-1 mt-3" onClick={tambahShow}>
          <i class="fa-solid fa-square-plus fs-6 "></i> Tambah
        </Button>
        <Row className="mt-3 mb-5">
          <Col>
            <Card className="p-3">
              <TableContainer
                style={{ height: 490, width: "100%" }}
                component={Paper}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="fw-bold text-center">No</TableCell>
                      <TableCell className="fw-bold text-center">
                        Items
                      </TableCell>
                      <TableCell className="fw-bold text-center">qty</TableCell>
                      <TableCell className="fw-bold text-center">
                        Loaner
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Description
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Loan Date
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {peminjaman
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow key={row._id}>
                          <TableCell className="text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.itemId.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.qty}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.userId.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.description}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.loanDate.substring(0, 10)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="warning"
                              className="me-1"
                              onClick={() => editShow(row)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button
                              variant="success"
                              onClick={() => checkShow(row)}
                            >
                              <Check2 />
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
                count={peminjaman.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal Add */}
      <Modal show={show1} onHide={tambahClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addPeminjaman}>
            <Row>
              <Form.Group className="mb-1">
                <Form.Label>Items</Form.Label>
                <Form.Select onChange={(e) => setBarang(e.target.value)}>
                  <option value="">Choose Items</option>
                  {items.map((items) => (
                    <option value={items._id} key={items._id}>
                      {items.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Loaner</Form.Label>
                <Form.Select onChange={(e) => setLoaner(e.target.value)}>
                  <option value="">Choose User</option>
                  {user.map((user) => (
                    <option value={user._id} key={user._id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="deskripsi"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Qty"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="deskripsi"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Description"
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={tambahClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPeminjaman}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Add */}

      {/* Modal Check */}
      <Modal show={show} onHide={checkClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Items</Form.Label>
          <Form.Control
            required
            type="text"
            name="Items"
            value={selectedLoan?.itemId.name}
            placeholder="Items"
            disabled
          />
          <Form onSubmit={checkLoan}>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={checkClose}>
            Close
          </Button>
          <Button variant="success" onClick={checkLoan}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Check */}

      {/* Modal Edit */}
      <Modal show={show2} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateLoan}>
            <Form.Group className="mb-1">
              <Form.Label>Items</Form.Label>
              <Form.Select onChange={(e) => setEditedItemName(e.target.value)} value={editedItemName}>
                <option value="">Choose Items</option>
                {items.map((items) => (
                  <option value={items._id} key={items._id}>
                    {items.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Loaner</Form.Label>
                <Form.Select onChange={(e) => setEditedLoanerName(e.target.value)} value={editedLoanerName}>
                  <option value="">Choose User</option>
                  {user.map((user) => (
                    <option value={user._id} key={user._id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            <Form.Label>Qty</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={editedQty}
              onChange={(e) => setEditedQty(e.target.value)}
              placeholder="Description"
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="warning" onClick={updateLoan}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Edit */}
    </Main>
  );
};

export default PeminjamanDashboard;
