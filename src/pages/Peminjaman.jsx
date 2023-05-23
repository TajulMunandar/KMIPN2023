import { useState } from "react";
import Navigationbar from "../component/Navigationbar";
import Footer from "../component/Footer";
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { CloudPlusFill } from "react-bootstrap-icons";
import DataTables from "./componentPeminjaman/DataTables";

const Peminjaman = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="peminjaman">
        <Navigationbar />
        <Container>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Row className="d-flex">
                <Col className="d-flex align-items-end">
                  <Card.Title className="fw-bold text-card-peminjaman">
                    {" "}
                    PEMINJAMAN
                  </Card.Title>
                </Col>
                <Col className="text-end">
                  <Button className="btn-home" onClick={handleShow}>
                    <CloudPlusFill size="25" /> Tambah
                  </Button>
                </Col>
              </Row>
              <Container className="mt-2 p-1">
                <DataTables />
              </Container>
            </Card.Body>
          </Card>
        </Container>
        <Footer />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Peminjaman</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Pinjam
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Peminjaman;
