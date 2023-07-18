import React, { useState, useEffect } from "react";
import Navigationbar from "../component/main/Navigationbar";
import Footer from "../component/main/Footer";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
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
import {
  CloudPlusFill,
  QrCodeScan,
  PencilSquare,
  Check2,
} from "react-bootstrap-icons";
import "/kmipn/kmipn/src/assets/css/main/index.css";
import AOS from "aos";
import axios from "axios";
import { QrScanner } from "@yudiel/react-qr-scanner";
import Swal from "sweetalert2";
import "aos/dist/aos.css";

const Peminjaman = () => {
  const [QrCode, SetQrCode] = useState(null);

  useEffect(() => {
    AOS.init();
    fetchPeminjaman();
  }, []);

  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);

  const [shows2, setShows2] = useState(false);
  const [shows3, setShows3] = useState(false);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleCloses = () => { 
    setShows(false)
    setItemsDatas('');
    setQtyData2('');
    setDescriptionData2('');
    SetQrCode('');
  };
  const handleShows = () => setShows(true);

  // Get Data
  const [items, setItems] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [itemsDatas2, setItemsDatas2] = useState([]);

  const fetchPeminjaman = async () => {
    try {
      const response = await axios.get("http://localhost:3000/client");
      const items = response.data.data;
      const itemsData = response.data.item;
      const itemsDatas2 = response.data.datas;
      setItems(items);
      setItemsData(itemsData);
      setItemsDatas2(itemsDatas2);
    } catch (error) {
      console.error(error);
    }
  };
  // End Get Data

  // Add Data
  const [itemsDatas, setItemsDatas] = useState([]);
  const [qty, setQtyData] = useState([]);
  const [description, setDescriptionData] = useState([]);

  const addPeminjaman = async (event) => {
    try {
      event.preventDefault();
      const PeminjamanData = {
        itemId: itemsDatas,
        qty: qty,
        description: description,
      };
      await axios.post("http://localhost:3000/client", PeminjamanData);
      fetchPeminjaman();
      handleClose();
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
  // end Add Data

  const handleCloses2 = () => {
    setShows2(false);
  };
  const handleShows2 = (items) => {
    setselectCheckData(items);
    setItemsCheck(items.itemId.name);
    setShows2(true);
  };

  // Check Data
  const [selectCheckData, setselectCheckData] = useState([]);
  const [ItemsCheck, setItemsCheck] = useState("");
  const [descriptionCheck, setDescriptionCheck] = useState("");
  const [conditionCheck, setConditionCheck] = useState("");

  const checkLoan = async (event) => {
    try {
      event.preventDefault();
      const checkItems = {
        description: descriptionCheck,
        condition: conditionCheck,
      };
      await axios.put(
        `http://localhost:3000/client/check/${selectCheckData._id}`,
        checkItems
      );
      fetchPeminjaman();
      handleCloses2();
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

  // End Check Data

  // Edit Data
  const handleCloses3 = () => {
    setShows3(false);
  };

  const handleShows3 = (items) => {
    setEditCheckData(items);
    setItemsEdit(items.itemId._id);
    setDescriptionEdit(items.description);
    setQtyEdit(items.qty);
    setShows3(true);
  };

  const [selectEditData, setEditCheckData] = useState([]);
  const [ItemsEdit, setItemsEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [qtyEdit, setQtyEdit] = useState("");

  const updateLoan = async (event) => {
    try {
      event.preventDefault();
      if (selectEditData) {
        const LoanData = {
          itemId: ItemsEdit,
          qty: qtyEdit,
          description: descriptionEdit,
        };
        await axios.put(
          `http://localhost:3000/client/${selectEditData._id}`,
          LoanData
        );
        fetchPeminjaman();
        handleCloses3();
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

  // Add Data
  const [itemsDatas3, setItemsDatas3] = useState([]);
  const [qty2, setQtyData2] = useState([]);
  const [description2, setDescriptionData2] = useState([]);

  const addPeminjaman2 = async (event) => {
    try {
      event.preventDefault();
      const PeminjamanData2 = {
        itemId: QrCode,
        qty: qty2,
        description: description2,
      };
      console.log(PeminjamanData2);
      await axios.post("http://localhost:3000/client", PeminjamanData2);
      fetchPeminjaman();
      handleCloses();
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
  // end Add Data


  // table
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
    <>
      <div className="peminjaman">
        <Navigationbar />
        <Container>
          <Card
            style={{ width: "100%" }}
            className="mb-3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Card.Body>
              <Row className="d-flex" data-aos="fade-up">
                <Col className="d-flex align-items-end" data-aos="fade-down">
                  <Card.Title className="fw-bold text-card-peminjaman">
                    {" "}
                    LOAN
                  </Card.Title>
                </Col>
                <Col className="text-end">
                  <Button className="btn-home me-2" onClick={handleShow}>
                    <CloudPlusFill size="25" />
                  </Button>
                  <Button className="btn-home" onClick={handleShows}>
                    <QrCodeScan size="25" />
                  </Button>
                </Col>
              </Row>
              <Container className="mt-2 p-1">
                <TableContainer
                  style={{ height: 490, width: "100%" }}
                  component={Paper}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className="fw-bold text-center">
                          No
                        </TableCell>
                        <TableCell className="fw-bold text-center">
                          Items
                        </TableCell>
                        <TableCell className="fw-bold text-center">
                          Qty
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
                      {items
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
                              {row.description}
                            </TableCell>
                            <TableCell className="text-center">
                              {row.loanDate.substring(0, 10)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="warning"
                                className="me-1"
                                onClick={() => handleShows3(row)}
                              >
                                <PencilSquare />
                              </Button>
                              <Button
                                variant="success"
                                onClick={() => handleShows2(row)}
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
                  count={items.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Container>
            </Card.Body>
          </Card>
        </Container>
        <Footer />
      </div>

      {/* manual modal */}
      <Modal show={show} onHide={handleClose} data-aos="fade-up">
        <Form className="p-2" onSubmit={addPeminjaman}>
          <Modal.Header closeButton>
            <Modal.Title>Manual Mode</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group
                className="mb-2"
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Items</Form.Label>
                <Form.Select onChange={(e) => setItemsDatas(e.target.value)}>
                  <option value="">Choose Items</option>
                  {itemsData.map((itemsData) => (
                    <option value={itemsData._id} key={itemsData._id}>
                      {itemsData.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" md="4">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Qty"
                  value={qty}
                  onChange={(e) => setQtyData(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-2" md="4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescriptionData(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Loan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* end manual modal */}

      {/* qr code modal */}
      <Modal show={shows} onHide={handleCloses} data-aos="fade-up">
        <Form className="p-2" onSubmit={addPeminjaman2}>
          <Modal.Header closeButton>
            <Modal.Title>QR Mode</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <div className="p-5 " style={{ width: "100%" }}>
                <QrScanner
                  onDecode={(result) => SetQrCode(result)}
                  onError={(error) => console.log(error?.message)}
                  style={{ width: "70%" }}
                />
              </div>
              <Form.Group md="4">
                <Form.Label>Items</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Barang"
                  value={
                    QrCode
                      ? itemsData.find((items) => items._id == QrCode)
                          ?.name
                      : ""
                  }
                  onChange={(e) => setItemsDatas3(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group md="4">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Qty"
                  value={qty2}
                  onChange={(e) => setQtyData2(e.target.value)}
                />
              </Form.Group>
              <Form.Group md="4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description2}
                  onChange={(e) => setDescriptionData2(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloses}>
              Tutup
            </Button>
            <Button variant="primary" type="submit">
              Pinjam
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* end qr modal */}

      {/* modal Check */}
      <Modal show={shows2} onHide={handleCloses2} data-aos="fade-up">
        <Form className="p-2" onSubmit={checkLoan}>
          <Modal.Header closeButton>
            <Modal.Title>Check Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group className="mb-1" md="4">
                <Form.Label>Items</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="keterangan"
                  value={ItemsCheck}
                  placeholder="Description"
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-1" md="4">
                <Form.Label>Condition</Form.Label>
                <Form.Select
                  onChange={(e) => setConditionCheck(e.target.value)}
                  value={conditionCheck}
                >
                  <option value="">Choose Condition</option>
                  <option value="1"> Good</option>
                  <option value="2">Middle</option>
                  <option value="3">Broken</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" md="4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={descriptionCheck}
                  onChange={(e) => setDescriptionCheck(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloses2}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* end Check modal */}

      {/* modal Edit */}
      <Modal show={shows3} onHide={handleCloses3} data-aos="fade-up">
        <Form className="p-2" onSubmit={updateLoan}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Group
                className="mb-2"
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Items</Form.Label>
                <Form.Select
                  onChange={(e) => setItemsEdit(e.target.value)}
                  value={ItemsEdit}
                >
                  <option value="">Choose Items</option>
                  {itemsDatas2.map((itemsDatas2) => (
                    <option value={itemsDatas2._id} key={itemsDatas2._id}>
                      {itemsDatas2.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" md="4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={descriptionEdit}
                  onChange={(e) => setDescriptionEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" md="4">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Qty"
                  value={qtyEdit}
                  onChange={(e) => setQtyEdit(e.target.value)}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloses3}>
              Close
            </Button>
            <Button variant="warning" type="submit">
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* end Check modal */}
    </>
  );
};

export default Peminjaman;
