import {Container, Button, Row, Col, Card} from "react-bootstrap"
import Main from "../../component/dashboard/Main";
import React, { useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from '@mui/material';
import { Trash, PencilSquare } from "react-bootstrap-icons";

const data = [
  { id: 1, status: 'tersedia', kode: "212112", kategori: "access point", nama: "mikrotik", serial: "212asdw12", tahun: "2002", kondisi : "sehat", ket : "Rusak" },
  // ...
];

const PeminjamanDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Main title="Loan Table" pageHeading={"Loan Table"} bread={"Loan"}>
      <Container>
        <Button className="fw-normal mb-1 mt-3">
          <i class="fa-solid fa-square-plus fs-6 "></i> Tambah
        </Button>
        <Row className="mt-3 mb-5">
        <Col>
        <Card className="p-3">
              <TableContainer style={{ height: 490, width: '100%' }} component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="fw-bold">No</TableCell>
                <TableCell className="fw-bold">Status</TableCell>
                <TableCell className="fw-bold">Kode Barang</TableCell>
                <TableCell className="fw-bold">Kategori</TableCell>
                <TableCell className="fw-bold">Nama Barang</TableCell>
                <TableCell className="fw-bold">Serial Number</TableCell>
                <TableCell className="fw-bold">Tahun Pengadaan</TableCell>
                <TableCell className="fw-bold">Kondisi</TableCell>
                <TableCell className="fw-bold">Ket</TableCell>
                <TableCell className="fw-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.kode}</TableCell>
                  <TableCell>{row.kategori}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.serial}</TableCell>
                  <TableCell>{row.tahun}</TableCell>
                  <TableCell>{row.kondisi}</TableCell>
                  <TableCell>{row.ket}</TableCell>
                  <TableCell>
                    <Button variant="warning" className="me-2">
                      <PencilSquare/>
                    </Button>
                    <Button variant="danger">
                      <Trash/>
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Card>
              </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default PeminjamanDashboard;
