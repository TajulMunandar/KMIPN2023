import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigationbar = () => {
  return (
    <div>
      <Navbar className="nav">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="brand">
              INVLOW
            </NavLink>
          </Navbar.Brand>
          <Nav>
            <NavLink to="/">
                <Button variant="outline-secondary" className="fw-bolder login-btn">LOGIN</Button>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
