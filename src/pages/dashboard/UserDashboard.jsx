import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
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

const UserDashboard = () => {
  // Get Data
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dashboard/user");
      const user = response.data.data;
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // End Get Data

  // Modal Tambah
  const [show1, setShow1] = useState(false);

  const tambahClose = () => {
    setShow1(false);
  };

  const tambahShow = () => {
    setShow1(true);
  };
  // End Modal Tambah

  // Add Data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value === "true";
    setIsAdmin(selectedRole);
  };

  const addUser = async (event) => {
    try {
      event.preventDefault();
      const userData = {
        name: name,
        username: username,
        password: password,
        isAdmin: isAdmin,
      };
      await axios.post("http://localhost:3000/dashboard/user", userData);
      fetchUser();
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
  // End Add Data

  // Modal Hapus
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const hapusClose = () => {
    setSelectedUser(null);
    setShow(false);
  };

  const hapusShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };
  // End Modal Hapus

   // Delete Data
   const deleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/dashboard/user/${selectedUser._id}`
      );
      fetchUser();
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
  const [selectUser, setSelectUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedRole, setEditedRole] = useState("");

  const editClose = () => {
    setSelectUser(null);
    setShow2(false);
  };

  const editShow = (user) => {
    setSelectUser(user);
    setEditedName(user.name);
    setEditedUsername(user.username);
    setEditedPassword(user.password);
    setEditedRole(user.isAdmin);
    setShow2(true);
  };
  // End Modal Edit

   // Edit Data
   const updateUser = async (event) => {
    try {
      event.preventDefault();
      if (selectUser) {
        const userData = {
          name: editedName,
          username: editedUsername,
          password: editedPassword,
          isAdmin: editedRole
        };
        await axios.put(`http://localhost:3000/dashboard/user/${selectUser._id}`, userData);
        fetchUser();
        editClose();
        Swal.fire({
          icon: 'success',
          title: 'Category Has Been Updated',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // End Edit Data

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
    <Main title="User Table" pageHeading={"User Table"} bread={"User"}>
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
                        Name
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Username
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Role
                      </TableCell>
                      <TableCell className="fw-bold text-center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user
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
                            {row.username}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.isAdmin ? "Super Admin" : "User"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="warning" className="me-2" onClick={() => editShow(row)}>
                              <PencilSquare />
                            </Button>
                            <Button variant="danger" onClick={() => hapusShow(row)}>
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
                count={user.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Col>
        </Row>
        Control
      </Container>

      {/* Modal Tambah */}
      <Modal show={show1} onHide={tambahClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addUser}>
            <Row>
              <Form.Group className="mb-1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Role</Form.Label>
                <Form.Select onChange={handleRoleChange}>
                  <option value="true">Admin</option>
                  <option value="false">User</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={tambahClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Tambah */}

      {/* Modal Hapus */}
      <Modal show={show} onHide={hapusClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda Yakin Ingin Menghapus{" "}
          <span className="fw-bold">{selectedUser?.name}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hapusClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Hapus */}

      {/* Modal Edit */}
      <Modal show={show2} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUser}>
            <Row>
              <Form.Group className="mb-1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={editedPassword}
                  onChange={(e) => setEditedPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label>Role</Form.Label>
                <Form.Select onChange={(e) => setEditedRole(e.target.value)} value={editedRole}>
                  <option value="true">Admin</option>
                  <option value="false">User</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="warning" onClick={updateUser}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal Edit */}

    </Main>
  );
};

export default UserDashboard;
