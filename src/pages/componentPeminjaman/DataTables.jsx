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

const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 2, name: 'Jane Smith', age: 25 },
  // ...
];

const DataTables = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  <Button variant="primary" className="me-2">
                    asd
                  </Button>
                  <Button variant="danger">asd</Button>
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
