import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Card,
  Form,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";
import { Trash, PencilSquare } from "react-bootstrap-icons";

const KategoriDashboard = () => {
  // Modal Delete
  const [show, setShow] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState(null);

  const hapusClose = () => {
    setSelectedKategori(null);
    setShow(false);
  };

  const hapusShow = (kategori) => {
    setSelectedKategori(kategori);
    setShow(true);
  };
  // end Modal Delete

  // Modal Tambah
  const [show1, setShow1] = useState(false);

  const tambahClose = () => {
    setShow1(false);
  };

  const tambahShow = () => {
    setShow1(true);
  };
  // End Modal Tambah

  

  // Get Data
  const [categoryData, setCategoryData] = useState([]);
  const [subData, setSubData] = useState([]);

  const fetchKategori = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/category"
      );
      const subData = response.data.data;
      const categoryData = response.data.category;
      setSubData(subData);
      setCategoryData(categoryData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);
  // End Get Data

  // Add Data
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  const addCategory = async (event) => {
    try {
      event.preventDefault();
      const categoryData = {
        categoryId: categoryName,
        name: subcategoryName,
      };
      await axios.post(
        "http://localhost:3000/dashboard/category",
        categoryData
      );
      fetchKategori();
      tambahClose();
      Swal.fire({
        icon: "success",
        title: "Category Has Been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Data
  const deleteKategori = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/dashboard/category/${selectedKategori._id}`
      );
      fetchKategori();
      hapusClose();
      Swal.fire({
        icon: "success",
        title: "Category Has Been Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // End Delete Data

  // Modal Edit
  const [show2, setShow2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedSubcategoryName, setEditedSubcategoryName] = useState("");

  const editClose = () => {
    setSelectedCategory(null);
    setShow2(false);
  };

  const editShow = (kategori) => {
    setSelectedCategory(kategori);
    setEditedCategoryName(kategori.categoryId.name);
    setEditedSubcategoryName(kategori.name);
    setShow2(true);
  };
  // End Modal Edit

  // Edit Data
  const updateKategori = async (event) => {
    try {
      event.preventDefault();
      if (selectedCategory) {
        const categoryData = {
          categoryId: editedCategoryName,
          name: editedSubcategoryName,
        };
        await axios.put(
          `http://localhost:3000/dashboard/category/${selectedCategory._id}`,
          categoryData
        );
        fetchKategori();
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

  // Page Table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // End Page

  return (
    <Main
      title="Categories Table"
      pageHeading={"Categories Table"}
      bread={"Categories"}
    >
      <Container>
        <Button className="fw-normal mb-1 mt-3" onClick={tambahShow}>
          <i className="fa-solid fa-square-plus fs-6 "></i> Tambah
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
                        Category
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Type Items
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subData
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
                            {row.categoryId.name}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="warning"
                              className="me-2"
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
                count={subData.length}
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
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Ingin Menghapus{" "}
          <span className="fw-bold">{selectedKategori?.name}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hapusClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteKategori}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Hapus */}

      {/* Modal Tambah */}
      <Modal show={show1} onHide={tambahClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addCategory}>
            <Row>
              <Form.Group className="mb-1">
                <Form.Label>Type Items</Form.Label>
                <Form.Select onChange={(e) => setCategoryName(e.target.value)}>
                  <option value="">Choose Type</option>
                  {categoryData.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  placeholder="Category"
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={tambahClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Tambah */}

      {/* Modal Edit */}
      <Modal show={show2} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateKategori}>
            <Row>
            <Form.Group className="mb-1">
                <Form.Label>Type Items</Form.Label>
                <Form.Select onChange={(e) => setEditedCategoryName(e.target.value)} value={editedCategoryName}>
                  {categoryData.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={editedSubcategoryName}
                  onChange={(e) => setEditedSubcategoryName(e.target.value)}
                  placeholder="Category"
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="warning" onClick={updateKategori}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Edit */}
    </Main>
  );
};

export default KategoriDashboard;
