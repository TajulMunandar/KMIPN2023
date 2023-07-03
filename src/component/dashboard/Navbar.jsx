import { Button, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Navibar = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(() =>{
    axios.get('http://localhost:3000/dashboard')
    .then(res => {
        if(res.data.valid){
            setName(res.data.username)
          }else{
            navigate('/')
          }
    })
    .catch(err => console.log(err))
  }, [])

  const handleLogout = () =>{
    axios.get('http://localhost:3000/logout')
    .then(res =>{
        if(res.data.valid == false){
            location.reload(true);
        }else{
            navigate('/login')
        }
    })
  }

  return (
    <Navbar className="navbar-classic navbar navbar-expand-lg">
        <ul className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
        <li className="dropdown ms-2">
            <Button variant="light" className="user-dashboard" id="dropdownUser" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <div className="p-1 text-black fw-semibold p-2">
                    <i className="fa-solid fa-user mx-1"></i>
                    {name}
                    
                </div>
            </Button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                <ul className="list-unstyled">
                    <li>
                        <Nav.Link onClick={handleLogout} className="dropdown-item">
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
