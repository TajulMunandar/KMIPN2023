import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Navigationbar = () => {
  return (
    <div>
      <Navbar className="nav">
        <Container>
          <Navbar.Brand>
            <a href="" className="brand">
              INVLOW
            </a>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="#trending">
                <Button variant="outline-secondary" className="fw-bolder login-btn">LOGIN</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
