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
    fetchStock();
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
    setQty(1);
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
          title: "Items Has Been Updated",
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
    fetchBarang();
  };

  const stockShow = (barang) => {
    setShow4(true);
  };
  //

  // fetch stock
  const [stock, setStock] = useState([]);

  const fetchStock = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/history"
      );
      const stock = response.data.data;
      setStock(stock);
    } catch (error) {
      console.error(error);
    }
  };
  // end fetch stock

  // add Stock
  const [itemsStock, setItemsStock] = useState();
  const [qtyStock, setQtyStock] = useState();

  const addStock = async (event) => {
    event.preventDefault();
    const Stock = {
      itemId: itemsStock,
      qty: qtyStock,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/dashboard/history",
        Stock
      );
      fetchStock();
      setItemsStock("");
      setQtyStock("");
      Swal.fire({
        icon: "success",
        title: "Add Stock Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // end Add Stock

  // modal Delete Stock
  const [show5, setShow5] = useState(false);
  const [SelectedItemsStock, setSelectedItemsStock] = useState();

  const stockDeleteClose = () => {
    setShow5(false);
    fetchStock();
  };

  const stockDeleteShow = (stock) => {
    setShow5(true);
    setSelectedItemsStock(stock);
  };
  // end Delete Stock

  // Delete Data
  const deleteStock = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/dashboard/history/${SelectedItemsStock._id}`
      );
      fetchStock();
      stockDeleteClose();
      Swal.fire({
        icon: "success",
        title: "Items History Has Been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // End Delete Data

  // Modal Edit Stcok
  const [show6, setShow6] = useState(false);
  const [SelectedEditItemsStock, setSelectedEditItemsStock] = useState(null);
  const [EditedItemsStock, setEditedItemsStock] = useState(null);
  const [EditedQtyStock, setEditedQtyStock] = useState(null);

  const stockEditClose = () => {
    setShow6(false);
    fetchStock();
  };

  const stockEditShow = (stock) => {
    setShow6(true);
    setSelectedEditItemsStock(stock);
    setEditedItemsStock(stock.itemId._id);
    setEditedQtyStock(stock.qty);
  };
  // End Modal Edit

  // Edit Stock Items 
  const EditStock = async (event) => {
    try {
      event.preventDefault();
      if (SelectedEditItemsStock) {
        const stockItems = {
          itemId: EditedItemsStock,
          qty: EditedQtyStock,
        };
        await axios.put(
          `http://localhost:3000/dashboard/history/${SelectedEditItemsStock._id}`,
           stockItems
        );
        fetchStock();
        stockEditClose();
        Swal.fire({
          icon: "success",
          title: "Items History Has Been Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // end Edit Stock Items

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
          className="fw-normal mb-1 mt-3 btn-dark text-white"
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
                      <TableCell className="fw-bold text-center">Qty</TableCell>
                      <TableCell className="fw-bold text-center">
                        Category
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Condition
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Description
                      </TableCell>
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
                            {row.subCategoryId.name}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`badge ${
                                row.condition === 0
                                  ? "bg-success"
                                  : row.condition === 1
                                  ? "bg-success"
                                  : row.condition === 2
                                  ? "bg-warning"
                                  : row.condition === 3
                                  ? "bg-danger"
                                  : ""
                              }`}
                            >
                              {row.condition === 0
                                ? "New"
                                : row.condition === 1
                                ? "Good"
                                : row.condition === 2
                                ? "Middle"
                                : row.condition === 3
                                ? "Broken"
                                : ""}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {row.description}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="primary"
                              onClick={() => qrShow(row)}
                              className="me-1 mb-1"
                            >
                              <QrCode />
                            </Button>
                            <Button
                              variant="warning"
                              className="me-1 mb-1"
                              onClick={() => editShow(row)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button
                              className="me-1 mb-1"
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
          <Button variant="outline-secondary" onClick={hapusClose}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={tambahClose}>
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
                  <option value="0"> New</option>
                  <option value="1"> Good</option>
                  <option value="2">Middle</option>
                  <option value="3">Broken</option>
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
          <Button variant="outline-secondary" onClick={editClose}>
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
          <Button variant="outline-secondary" onClick={qrClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Qr */}

      {/* Modal Stock */}
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
          <Form onSubmit={addStock}>
            <Row>
              <Col>
                <Form.Group className="mb-1">
                  <Form.Select
                    onChange={(e) => setItemsStock(e.target.value)}
                    required
                  >
                    <option value="">Choose Items</option>
                    {barang.map((barang) => (
                      <option value={barang._id} key={barang._id}>
                        {barang.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-1">
                  <Form.Control
                    required
                    type="number"
                    name="deskripsi"
                    value={qtyStock}
                    onChange={(e) => setQtyStock(e.target.value)}
                    placeholder="Qty"
                  />
                </Form.Group>
              </Col>
              <Col className="col-1">
                <Button type="submit">
                  <i class="fa-solid fa-square-plus fs-6 "></i>
                </Button>
              </Col>
            </Row>
          </Form>
          <h4 className="mt-2">History Stock</h4>
          <Card className="mt-3">
            <TableContainer
              style={{ height: 490, width: "100%" }}
              component={Paper}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold text-center">No</TableCell>
                    <TableCell className="fw-bold text-center">Items</TableCell>
                    <TableCell className="fw-bold text-center">Qty</TableCell>
                    <TableCell className="fw-bold text-center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stock
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          {row.itemId.name}
                        </TableCell>
                        <TableCell className="text-center">{row.qty}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="warning"
                            className="me-1"
                            onClick={() => stockEditShow(row)}
                          >
                            <PencilSquare />
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => stockDeleteShow(row)}
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

      {/* hapus */}
      <Modal show={show5} onHide={stockDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Stock Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Ingin Menghapus{" "}
          <span className="fw-bold">{SelectedItemsStock?.itemId.name}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={stockDeleteClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteStock}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* EndModal Hapus  */}

      {/* hapus */}
      <Modal show={show6} onHide={stockEditClose}>
      <Form onSubmit={EditStock}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-1">
              <Form.Label>Items</Form.Label>
              <Form.Select
                onChange={(e) => setEditedItemsStock(e.target.value)}
                value={EditedItemsStock} disabled
              >
                <option value="">Choose Items</option>
                {barang.map((barang) => (
                  <option value={barang._id} key={barang._id}>
                    {barang.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Qty</Form.Label>
              <Form.Control
                required
                type="text"
                name="deskripsi"
                value={EditedQtyStock}
                onChange={(e) => setEditedQtyStock(e.target.value)}
                placeholder="Items"
              />
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={stockEditClose}>
            Close
          </Button>
          <Button variant="warning" type="submit">
            Edit
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>
      {/* EndModal Hapus  */}

      {/* End Modal Stock */}
    </Main>
  );
};

export default BarangHabisDashboard;
