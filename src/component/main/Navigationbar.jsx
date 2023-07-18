import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../assets/css/theme.css";
import "../../assets/css/dashboard/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navigationbar = () => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard")
      .then((res) => {
        const { valid, username } = res.data;
        if (valid) {
          setName(username.username);
          setValid(true);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:3000/logout").then((res) => {
      if (res.data.valid == false) {
        location.reload(true);
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <div>
      <Navbar className="nav">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="brand">
              INVLOW
            </NavLink>
          </Navbar.Brand>
          <Nav className="navbar">
            {valid ? (
              <Button
                onClick={handleLogout}
                className="user-dashboard bg-transparent border-0 "
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="p-1 text-black fw-semibold p-2">
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                  Logout
                </div>
              </Button>
            ) : (
              <NavLink to="/login">
                <Button
                  variant="outline-secondary"
                  className="fw-bolder login-btn"
                >
                  LOGIN
                </Button>
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
