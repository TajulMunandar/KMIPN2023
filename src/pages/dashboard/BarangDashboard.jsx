import { Button, Col, Container, Row } from "react-bootstrap";
import Main from "../../component/dashboard/Main";
import DataTables from "../componentPeminjaman/DataTables";

const BarangDashboard = () => {
  return (
    <Main title="Tabel Barang" pageHeading={"Tabel Barang"}>
      <Container>
        <Button className="fw-normal mb-1 mt-3">
          <i class="fa-solid fa-square-plus fs-6 "></i> Tambah
        </Button>
        <Row className="mt-3">
            <Col>
            <DataTables />
            </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default BarangDashboard;
