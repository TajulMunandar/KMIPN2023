import {Container, Button, Row, Col} from "react-bootstrap"
import React, { useState } from 'react';
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
} from '@mui/material';
import { CheckLg, Trash, PencilSquare } from "react-bootstrap-icons";

const data = [
  { id: 1, name: 'John Doe', age: "2/25/2002", },
  { id: 2, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 3, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 4, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 5, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 6, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 7, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 8, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 9, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 10, name: 'Jane Smith', age:  "2/25/2002" },
  { id: 11, name: 'Jane Smith', age:  "2/25/2002" },
  // ...
];

const UserDashboard = () => {
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
    <Main title="User Table" pageHeading={"User Table"} bread={"User"}>
      <Container>
        <Button className="fw-normal mb-1 mt-3">
          <i class="fa-solid fa-square-plus fs-6 "></i> Tambah
        </Button>
        <Row className="mt-3">
            <Col>
            <TableContainer style={{ height: 490, width: '100%' }} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold">No</TableCell>
              <TableCell className="fw-bold">Barang</TableCell>
              <TableCell className="fw-bold">Peminjam</TableCell>
              <TableCell className="fw-bold">Tanggal/Waktu Pinjam</TableCell>
              <TableCell className="fw-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
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
            </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default UserDashboard;
