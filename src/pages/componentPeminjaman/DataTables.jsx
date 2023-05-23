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
import { Button, Container } from 'react-bootstrap';
import { CheckLg, CloudPlusFill, Trash } from "react-bootstrap-icons";

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

const DataTables = () => {
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
    <Container>
      <TableContainer style={{ height: 490, width: '100%' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Barang</TableCell>
              <TableCell>Peminjam</TableCell>
              <TableCell>Tanggal/Waktu Pinjam</TableCell>
              <TableCell>Action</TableCell>
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
                  <Button variant="primary" className="me-2">
                    <CheckLg />
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
    </Container>
  );
};

export default DataTables;
