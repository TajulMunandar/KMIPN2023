import { Button, Col, Container, Row } from "react-bootstrap";
import Main from "../../../component/dashboard/Main";

const PeminjamanLaporan = () => {
  return (
    <Main title="Tabel Laporan Peminjaman" pageHeading={"Tabel Laporan Peminjaman"}>
      <Container>
        <Button className="fw-normal mb-1 mt-3">
          <i class="fa-solid fa-square-plus fs-6 "></i> Tambah
        </Button>
        <Row className="mt-3">
          <Col>
            
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default PeminjamanLaporan;
