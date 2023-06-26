import {Container, Button, Row, Col} from "react-bootstrap"
import DataTables from "../componentPeminjaman/DataTables";
import Main from "../../component/dashboard/Main";

const PeminjamanDashboard = () => {
  
  return (
    <Main title="Loan Table" pageHeading={"Loan Table"} bread={"Loan"}>
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

export default PeminjamanDashboard;
