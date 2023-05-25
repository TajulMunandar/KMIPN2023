import { Card, Col, Row } from "react-bootstrap";
import Main from "../../component/dashboard/Main";


const categories = [
  { name: 'Kategori 1', itemCount: 5 },
  { name: 'Kategori 2', itemCount: 3 },
  { name: 'Kategori 3', itemCount: 2 },
  { name: 'Kategori 4', itemCount: 1 },
  { name: 'Kategori 5', itemCount: 4 },
  { name: 'Kategori 6', itemCount: 5 },
  { name: 'Kategori 7', itemCount: 3 },
  { name: 'Kategori 8', itemCount: 2 },
];


const HomeDashboard = () => {
  return (
    <Main title="DASHBOARD" pageHeading={"Dashboard"}>
      <Row>
      <>
      {categories.map((category, index) => (
        <Col key={index} className="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
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
      </Row>
    </Main>
  );
};

export default HomeDashboard;
