import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navibar = () => {
  return (
    <Navbar className="navbar-classic navbar navbar-expand-lg">
        <ul className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
        <li className="dropdown ms-2">
            <Button variant="light" className="user-dashboard" id="dropdownUser" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <div className="p-1 text-black fw-semibold p-2">
                    <i className="fa-solid fa-user mx-1"></i>
                    admin
                </div>
            </Button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                <ul className="list-unstyled">
                    <li>
                        <Nav.Link as={NavLink} to="/" className="dropdown-item">
                            <i className="fa-regular dropdown-item-icon fa-arrow-right-from-bracket me-1 fa-fw"></i>
                                Logout
                        </Nav.Link>
                    </li>
                </ul>
            </div>
        </li>
        </ul>
    </Navbar>
  );
};

export default Navibar;
