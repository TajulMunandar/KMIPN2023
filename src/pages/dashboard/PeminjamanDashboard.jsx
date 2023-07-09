import { Container, Button, Row, Col, Card, Modal, Form } from "react-bootstrap";
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
import { Check2 } from "react-bootstrap-icons";

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
  const [keterangan, setKeterangan] = useState("");

  const addPeminjaman = async (event) => {
    try {
      event.preventDefault();
      const PeminjamanData = {
        userId: loaner,
        barangId: barang,
        keterangan: keterangan,
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
        title: "Item on loan",
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

  const checkLoan = async (event) => {
    try {
      event.preventDefault();
      await axios.put(
        `http://localhost:3000/dashboard/peminjaman/check/${selectedLoan._id}`
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
                            {row.barangId.deskripsi}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.userId.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.keterangan}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.tanggalPinjam.substring(0, 10)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="success" onClick={() => checkShow(row)}>
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
                      {items.deskripsi}
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
          <Button variant="secondary" onClick={tambahClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPeminjaman}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Add */}

      {/* Modal Hapus */}
      <Modal show={show} onHide={checkClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Ingin Menyimpan{" "}
          <span className="fw-bold">{selectedLoan?.barangId.deskripsi}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={checkClose}>
            Close
          </Button>
          <Button variant="success" onClick={checkLoan}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Hapus */}
    </Main>
  );
};

export default PeminjamanDashboard;
