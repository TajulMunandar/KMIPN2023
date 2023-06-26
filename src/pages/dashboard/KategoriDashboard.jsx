import { Button, Col, Container, Row, Modal, Card } from "react-bootstrap";
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
import Swal from 'sweetalert2'
import { Trash, PencilSquare } from "react-bootstrap-icons";

const KategoriDashboard = () => {
  // Modal
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
  // end Modal

  // Get Data
  const [kategoriData, setKategoriData] = useState([]);

  const fetchKategori = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/dashboard-kategori"
      );
      const kategoriData = response.data;
      setKategoriData(kategoriData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);
  // End Get Data

  // Delete Data
  const deleteKategori = async () => {
    try {
      await axios.delete(`http://localhost:8000/dashboard-kategori/${selectedKategori.id}`);
      fetchKategori(); 
      hapusClose(); 
      Swal.fire({
        icon: 'success',
        title: 'Category Has Been Deleted',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error(error);
    }
  };
  // End Delete Data

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
        <Button className="fw-normal mb-1 mt-3">
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
                        Nama Kategori
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kategoriData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell className="text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.kategori}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="warning" className="me-2">
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
                count={kategoriData.length}
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
          <Modal.Title>Hapus Kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Ingin Menghapus{" "}
          <span className="fw-bold">{selectedKategori?.kategori}</span> ?
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

      
    </Main>
  );
};

export default KategoriDashboard;
