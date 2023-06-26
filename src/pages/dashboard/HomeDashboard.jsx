import { Button, Card, Col, Row } from "react-bootstrap";
import Main from "../../component/dashboard/Main";
import React, { useState } from "react";
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
import { Check } from "react-bootstrap-icons";

const data = [
  { id: 1, name: "John Doe", age: "2/25/2002" },
  { id: 2, name: "Jane Smith", age: "2/25/2002" },
  { id: 3, name: "Jane Smith", age: "2/25/2002" },
  { id: 4, name: "Jane Smith", age: "2/25/2002" },
  { id: 5, name: "Jane Smith", age: "2/25/2002" },
  { id: 6, name: "Jane Smith", age: "2/25/2002" },
  { id: 7, name: "Jane Smith", age: "2/25/2002" },
  { id: 8, name: "Jane Smith", age: "2/25/2002" },
  { id: 9, name: "Jane Smith", age: "2/25/2002" },
  { id: 10, name: "Jane Smith", age: "2/25/2002" },
  { id: 11, name: "Jane Smith", age: "2/25/2002" },
  // ...
];

const categories = [
  { name: "Kategori 1", itemCount: 5 },
  { name: "Kategori 2", itemCount: 3 },
  { name: "Kategori 3", itemCount: 2 },
  { name: "Kategori 4", itemCount: 1 },
];

const HomeDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Main title="DASHBOARD" pageHeading={"Dashboard"} bread={"Dashboard"}>
      <Row>
        <>
          {categories.map((category, index) => (
            <Col
              key={index}
              className="col-xl-3 col-lg-6 col-md-12 col-12 mt-6"
            >
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="mb-0 fw-bold">{category.name}</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                      <i className="bi bi-briefcase fs-4"></i>
                    </div>
                  </div>
                  <div>
                    <p className="">{category.itemCount} Barang</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
        <Col>
          <h3 className="fw-bolder mt-5">Maintanance Table</h3>
          <Card className="p-3 mb-4">
            <TableContainer
              style={{ height: 490, width: "100%" }}
              component={Paper}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold">No</TableCell>
                    <TableCell className="fw-bold">Barang</TableCell>
                    <TableCell className="fw-bold">Peminjam</TableCell>
                    <TableCell className="fw-bold">
                      Tanggal/Waktu Pinjam
                    </TableCell>
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
                        <Button variant="success" className="me-2">
                          <Check />
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
    </Main>
  );
};

export default HomeDashboard;
