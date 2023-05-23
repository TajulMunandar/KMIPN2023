import Navigationbar from "../component/Navigationbar";
import Footer from "../component/Footer";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { CloudPlusFill } from "react-bootstrap-icons";
import DataTables from "./componentPeminjaman/DataTables";

const Peminjaman = () => {
 
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
                  <Button className="btn-home">
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
    </>
  );
};

export default Peminjaman;
