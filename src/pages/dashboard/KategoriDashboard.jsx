import { Button, Col, Container, Row } from "react-bootstrap";
import Main from "../../component/dashboard/Main";


const KategoriDashboard = () => {
  return (
    <Main title="Tabel Kategori" pageHeading={"Tabel Kategori"}>
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

export default KategoriDashboard;
