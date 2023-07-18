import { Button, Col, Container, Row, Card } from "react-bootstrap";
import Main from "../../../component/dashboard/Main";
import React, { useState, useEffect } from "react";
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

const PeminjamanLaporan = () => {
  // Get Data
  const [peminjaman, setPeminjaman] = useState([]);

  const fetchPeminjaman = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/dashboard/report"
      );
      const peminjaman = response.data.data;
      setPeminjaman(peminjaman);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);
  // End Get Data

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
    <Main
      title="Loan Report Table"
      pageHeading={"Loan Report Table"}
      bread={"Loan Report"}
    >
      <Container>
        <Row className="mt-3">
          <Col>
            <Card className="p-3 mb-4">
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
                        Loaner
                      </TableCell>
                      <TableCell className="fw-bold text-center">Qty</TableCell>
                      <TableCell className="fw-bold text-center">
                        Description
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Loan Date
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Return Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {peminjaman
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
                            {row.userId.name}
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
                            {new Date(row.returnDate).getFullYear() < 2000
                              ? "No Record"
                              : row.returnDate.substring(0, 10)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={peminjaman.length}
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

export default PeminjamanLaporan;
