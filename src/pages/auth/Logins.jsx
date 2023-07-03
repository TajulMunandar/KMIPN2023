import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import "/kmipn/kmipn/src/assets/css/theme.css";
import AOS from "aos";
import "aos/dist/aos.css"

const Logins = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  const [username, setUsername] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };


  
 
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handelLogin = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/login', {username, password})
    .then(res => {
      if(res.data.Login){
        navigate("/dashboard")
      }else{
        alert("no record")
      }
      console.log(res);
    })
    .catch(err => console.log(err));
  };

  useEffect(() =>{
    axios.get('http://localhost:3000/dashboard')
    .then(res => {
      if(res.data.valid){
        navigate('/dashboard')
      }else{
        navigate('/login')
      }
    })
    .catch(err => console.log(err))
  }, [])

  
  return (
    <div className="body" >
      <Container className="d-flex flex-column">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
          <Col className="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
            <Card className="smooth-shadow-md" data-aos="zoom-out-down" data-aos-duration="1000">
              <Card.Body className="p-4">
                <div>
                  <Player
                    src="https://assets1.lottiefiles.com/packages/lf20_AasFI3JGwb.json"
                    background="transparent"
                    speed="1"
                    loop
                    controls
                    autoplay
                    style={{ width: "75%" }}
                  />
                  <p className="text-muted text-center">
                    Please enter your user information.
                  </p>
                </div>
                <Form className="p-2" onSubmit={handelLogin}>
                  <Row className="mb-3">
                    <Form.Group
                      className="mb-4"
                      md="4"
                      controlId="validationCustom01"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      className="mb-4"
                      md="4"
                      controlId="validationCustom02"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                       checked={showPassword}
                       onChange={handleCheckboxChange}
                        label="Show Password"
                        feedbackType="invalid"
                      />
                    </Form.Group>
                    <Button type="submit" className="btn-home">
                      Sign In
                    </Button>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Logins;