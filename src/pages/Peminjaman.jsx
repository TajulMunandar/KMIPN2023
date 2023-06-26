import React, { useState, useEffect } from "react";
import Navigationbar from "../component/main/Navigationbar";
import Footer from "../component/main/Footer";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { CloudPlusFill, QrCodeScan } from "react-bootstrap-icons";
import DataTables from "./componentPeminjaman/DataTables";
import "/kmipn/kmipn/src/assets/css/main/index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Webcam from "react-webcam";

const Peminjaman = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const WebcamComponent = () => <Webcam />;
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);
  return (
    <>
      <div className="peminjaman">
        <Navigationbar />
        <Container>
          <Card
            style={{ width: "100%" }}
            className="mb-3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Card.Body>
              <Row className="d-flex" data-aos="fade-up">
                <Col className="d-flex align-items-end" data-aos="fade-down">
                  <Card.Title className="fw-bold text-card-peminjaman">
                    {" "}
                    LOAN
                  </Card.Title>
                </Col>
                <Col className="text-end">
                  <Button className="btn-home me-2" onClick={handleShow}>
                    <CloudPlusFill size="25" />
                  </Button>
                  <Button className="btn-home" onClick={handleShows}>
                    <QrCodeScan size="25" />
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

      <Modal show={show} onHide={handleClose} data-aos="fade-up">
        <Modal.Header closeButton>
          <Modal.Title>Manual Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="p-2">
            <Row className="mb-3">
              <Form.Group
                className="mb-4"
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Barang</Form.Label>
                <Form.Control required type="text" placeholder="Barang" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-4"
                md="4"
                controlId="validationCustom02"
              >
                <Form.Label>Peminjam</Form.Label>
                <Form.Control required type="text" placeholder="Peminjam" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Pinjam
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={shows} onHide={handleCloses} data-aos="fade-up">
        <Modal.Header closeButton>
          <Modal.Title>QR Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="p-2">
            <Row className="mb-3">
              <div className="text-center">
                <Webcam
                  audio={false}
                  height={300}
                  // ref={webcamRef}
                  width={300}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
              <Form.Group
                className="mb-4"
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Barang</Form.Label>
                <Form.Control required type="text" placeholder="Barang" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleCloses}>
            Pinjam
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Peminjaman;
