import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import Main from "../../component/dashboard/Main";
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
import QRCode from "react-qr-code";
import { Trash, PencilSquare, QrCode } from "react-bootstrap-icons";
import { SelectAll } from "@mui/icons-material";

const BarangHabisDashboard = () => {
  // Get Data
  const [barang, setBarang] = useState([]);

  const fetchBarang = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/barang"
      );
      const barang = response.data.data;
      setBarang(barang);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBarang();
    fetchCategories();
  }, []);
  // End Get Data

  // Modal Hapus
  const [show, setShow] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);

  const hapusClose = () => {
    setSelectedBarang(null);
    setShow(false);
  };

  const hapusShow = (barang) => {
    setSelectedBarang(barang);
    setShow(true);
  };
  // End Modal Hapus

  // Delete Data
  const deleteBarang = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/dashboard/barang/${selectedBarang._id}`
      );
      fetchBarang();
      hapusClose();
      Swal.fire({
        icon: "success",
        title: "Items Has Been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // End Delete Data

  // Modal Tambah
  const [show1, setShow1] = useState(false);

  const tambahClose = () => {
    setShow1(false);
    resetForm();
  };

  const tambahShow = () => {
    fetchCategories();
    setShow1(true);
  };
  // End Modal Tambah

  // Add Data
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/category"
      );
      const category = response.data.data;
      setCategory(category);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setItems("");
    setSerialNumber("");
    setTahun("");
    setQty("");
    setDeskription("");
    setKondisi("");
    setCategoryId("");
  };

  const [items, setItems] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [tahun, setTahun] = useState("");
  const [qty, setQty] = useState(1);
  const [description, setDeskription] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleConditionChange = (e) => {
    const selectedCondition = e.target.value;
    setKondisi(selectedCondition);
  };

  const addBarang = async (event) => {
    try {
      event.preventDefault();
      const itemsData = {
        name: items,
        serialNumber: serialNumber,
        procurementYear: tahun,
        qty: qty,
        description: description,
        kondisi: kondisi,
        subCategoryId: categoryId,
      };
      await axios.post("http://localhost:3000/dashboard/barang", itemsData);
      fetchBarang();
      tambahClose();
      Swal.fire({
        icon: "success",
        title: "Add Items Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // End Add Data

  // Modal Edit
  const [show2, setShow2] = useState(false);
  const [selectBarang, setSelectBarang] = useState(null);
  const [editedBarang, setEditedBarang] = useState("");
  const [editedQty, setEditedQty] = useState("");
  const [editedSerialNumber, setEditedSerialNumber] = useState("");
  const [editedTahun, setEditedTahun] = useState("");
  const [editedKeterangan, setEditedKeterangan] = useState("");
  const [editedKondisi, setEditedKondisi] = useState("");
  const [editedCategoryId, setEditedCategoryId] = useState("");
  const [CategoryID, setCategoryID] = useState("");

  const editClose = () => {
    setSelectBarang(null);
    setShow2(false);
  };

  const editShow = (barang) => {
    setSelectBarang(barang);
    setEditedBarang(barang.name);
    setEditedSerialNumber(barang.serialNumber);
    setEditedTahun(barang.procurementYear);
    setEditedQty(barang.qty);
    setEditedKeterangan(barang.description);
    setEditedKondisi(barang.condition);
    setEditedCategoryId(barang.subCategoryId._id);
    setCategoryID(barang.subCategoryId.categoryId.name === "Disposable");
    setShow2(true);
    
  };
  // End Modal Edit

  // Edit Data
  const updateBarang = async (event) => {
    try {
      event.preventDefault();
      if (selectBarang) {
        const itemsData = {
          name: editedBarang,
          serialNumber: editedSerialNumber,
          procurementYear: editedTahun,
          condition: editedKondisi,
          qty: editedQty,
          description: editedKeterangan,
          subCategoryId: editedCategoryId,
        };
        await axios.put(
          `http://localhost:3000/dashboard/barang/${selectBarang._id}`,
          itemsData
        );
        fetchBarang();
        editClose();
        Swal.fire({
          icon: "success",
          title: "Category Has Been Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // End Edit Data

  // Modal Qr
  const [show3, setShow3] = useState(false);
  const [selectedBarangQr, setSelectedBarangQr] = useState("");
  const [selectedNameBarangQr, setSelectedNameBarangQr] = useState("");
  const qrCodeRef = useRef(null);

  const qrClose = () => {
    setShow3(false);
  };

  const qrShow = (barang) => {
    setShow3(true);
    setSelectedBarangQr(barang._id);
    setSelectedNameBarangQr(barang.name);
  };

  const handleDownload = () => {
    const qrCodeElement = qrCodeRef.current;
    console.log(qrCodeElement);
    if (qrCodeElement) {
      htmlToImage
        .toPng(qrCodeElement)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.download = "qr_code.png";
          link.href = dataUrl;
          link.click();
          qrClose();
        })
        .catch(function (error) {
          console.error("Error generating QR code:", error);
        });
    }
  };
  // End Modal qr

  // Modal Stock
  const [show4, setShow4] = useState(false);

  const stockClose = () => {
    setShow4(false);
  };

  const stockShow = (barang) => {
    setShow4(true);
  };
  //

  // form dinamis
  const [typeItems, setTypeItems] = useState("");
  const [additionalField, setAdditionalField] = useState("");

  const handleTypeItemsChange = (e) => {
    setTypeItems(e.target.value);
  };

  const handleAdditionalFieldChange = (e) => {
    setAdditionalField(e.target.value);
  };

  const renderAdditionalField = () => {
    if (typeItems === "Disposable") {
      return (
        <Form onSubmit={addBarang}>
          <Row>
            <Form.Group className="mb-1">
              <Form.Label>Items</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                placeholder="Items"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                required
                type="number"
                name="serialNumber"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Procurement Year</Form.Label>
              <Form.Control
                required
                type="number"
                name="procurementYear"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                placeholder="Procurement Year"
              />
            </Form.Group>
            <Form.Group className="mb-1">
            <Form.Label>Qty</Form.Label>
              <Form.Control
                required
                type="number"
                name="qty"
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
                name="description"
                value={description}
                onChange={(e) => setDeskription(e.target.value)}
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Choose Category</option>
                {category.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      );
    } else if (typeItems === "Not Disposable") {
      return (
        <Form onSubmit={addBarang}>
          <Row>
            <Form.Group className="mb-1">
              <Form.Label>Items</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                placeholder="Items"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                required
                type="number"
                name="serialNumber"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Procurement Year</Form.Label>
              <Form.Control
                required
                type="number"
                name="procurementYear"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                placeholder="Procurement Year"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                required
                type="number"
                name="qty"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="Qty"
                hidden
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDeskription(e.target.value)}
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Choose Category</option>
                {category.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      );
    } else {
      return null;
    }
  };
  // end form dinamis

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
    <Main title="Items Table" pageHeading={"Items Table"} bread={"Items"}>
      <Container>
        <Button className="fw-normal mb-1 mt-3 me-2" onClick={tambahShow}>
          <i class="fa-solid fa-square-plus fs-6 "></i> Add Items
        </Button>
        <Button
          className="fw-normal mb-1 mt-3 btn-info text-white"
          onClick={stockShow}
        >
          <i class="fa-solid fa-square-plus fs-6 "></i> Add Stock
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
                        Status
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Serial Number
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Procurement Year
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Qty
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Description
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Category
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Condition
                      </TableCell>
                      <TableCell className="fw-bold text-center">Ket</TableCell>
                      <TableCell className="fw-bold text-center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {barang
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
                            {row.name}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`badge ${
                                row.qty == 0 ? "bg-danger" : "bg-success"
                              }`}
                            >
                              {row.qty == 0 ? "Not Avalaible" : "Avaible"}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {row.serialNumber}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.procurementYear}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.qty}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.description}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.subCategoryId.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.condition}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.description}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="primary"
                              onClick={() => qrShow(row)}
                              className="me-1"
                            >
                              <QrCode />
                            </Button>
                            <Button
                              variant="warning"
                              className="me-1"
                              onClick={() => editShow(row)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => hapusShow(row)}
                            >
                              <Trash />
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
                count={barang.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal Hapus */}
      <Modal show={show} onHide={hapusClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Ingin Menghapus{" "}
          <span className="fw-bold">{selectedBarang?.name}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hapusClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteBarang}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Hapus */}

       {/* Modal Tambah */}
       <Modal show={show1} onHide={tambahClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-1">
            <Form.Label>Type Items</Form.Label>
            <Form.Select onChange={handleTypeItemsChange}>
              <option value="">Choose Type Items</option>
              <option value="Disposable">Disposable</option>
              <option value="Not Disposable">Not Dispasable</option>
            </Form.Select>
          </Form.Group>
          {renderAdditionalField()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={tambahClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBarang}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Tambah */}

      {/* Modal Edit */}
      <Modal show={show2} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateBarang}>
            <Row>
              <Form.Group className="mb-1">
                <Form.Label>Items</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="deskripsi"
                  value={editedBarang}
                  onChange={(e) => setEditedBarang(e.target.value)}
                  placeholder="Items"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="qty"
                  value={editedQty}
                  onChange={(e) => setEditedQty(e.target.value)}
                  placeholder="Code"
                  disabled={CategoryID }
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="serialNumber"
                  value={editedSerialNumber}
                  onChange={(e) => setEditedSerialNumber(e.target.value)}
                  placeholder="Serial Number"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Years</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="tahun"
                  value={editedTahun}
                  onChange={(e) => setEditedTahun(e.target.value)}
                  placeholder="Years"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="keterangan"
                  value={editedKeterangan}
                  onChange={(e) => setEditedKeterangan(e.target.value)}
                  placeholder="Description"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Condition</Form.Label>
                <Form.Select
                  onChange={(e) => setEditedKondisi(e.target.value)}
                  value={editedKondisi}
                >
                  <option value="">Choose Condition</option>
                  <option value="New"> New</option>
                  <option value="Good"> Good</option>
                  <option value="Broken">Broken</option>
                  <option value="Middle">Middle</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  onChange={(e) => setEditedCategoryId(e.target.value)}
                  value={editedCategoryId}
                >
                  <option value="">Choose Category</option>
                  {category.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="warning" onClick={updateBarang}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Edit */}

      {/* Modal Qr Code */}
      <Modal show={show3} onHide={qrClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Qr Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateBarang}>
            <Row>
              <QRCode
                value={selectedBarangQr}
                className="p-4"
                ref={qrCodeRef}
              />
              <Form.Group className="mb-1">
                <Form.Label>Items</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="deskripsi"
                  value={selectedNameBarangQr}
                  placeholder="Items"
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={qrClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Qr */}

      {/* Modal Hapus */}
      <Modal
        show={show4}
        onHide={stockClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Stock Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-1">
                  <Form.Control
                    required
                    type="text"
                    name="deskripsi"
                    placeholder="Items"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-1">
                  <Form.Control
                    required
                    type="number"
                    name="deskripsi"
                    placeholder="Qty"
                  />
                </Form.Group>
              </Col>
              <Col className="col-1">
                <Button>
                  <i class="fa-solid fa-square-plus fs-6 "></i>
                </Button>
              </Col>
            </Row>
            <Card className="mt-3">
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
                      <TableCell className="fw-bold text-center">Qty</TableCell>
                      <TableCell className="fw-bold text-center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {barang
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
                            {row.deskripsi}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.keterangan}
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
                              variant="danger"
                              onClick={() => hapusShow(row)}
                            >
                              <Trash />
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
                count={barang.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={stockClose}>
            Close
          </Button>
          <Button variant="danger" onClick={stockClose}>
            Delete
          </Button>
        </Modal.Footer> */}
      </Modal>
      {/* End Modal Hapus */}
    </Main>
  );
};

export default BarangHabisDashboard;
